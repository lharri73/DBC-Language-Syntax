/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; version 2.
 * 
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see 
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/

import { readFileSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode'

import { DBCParser } from './parser';
import LanguageSettings from './settings';


// create connection for the server

interface serverCapabilities{
    config: boolean,
    workspaceFolder: boolean,
    diagnosticInformation: boolean
}

export default class DBCServer implements vscode.CustomTextEditorProvider {

    private static readonly viewType = 'dbc.dbcViewer';
    private defaultSettings: LanguageSettings;
    private globalSettings: LanguageSettings;
    private documentSettings: Map<string, Thenable<LanguageSettings>>;
    private parser: DBCParser;
    private listeners: vscode.Disposable[];
    private ownerDoc: vscode.TextDocument | null;
    
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new DBCServer(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(DBCServer.viewType, provider);
		return providerRegistration;
	}

    constructor(private readonly context: vscode.ExtensionContext){
        this.defaultSettings = {silenceMapWarnings: false};
        this.globalSettings = this.defaultSettings;
        this.documentSettings = new Map();
        this.parser = new DBCParser(context);
        this.ownerDoc = null;
        this.listeners = [];
    }
    
    public async resolveCustomTextEditor(
        document: vscode.TextDocument, 
        webviewPanel: vscode.WebviewPanel, 
        _token: vscode.CancellationToken): 
        Promise<void>
    {

        webviewPanel.webview.options = {
            enableScripts: true,
        };

        // setup the html content
        const appDistPath = join(__dirname, "..", "client", "dist");
        const appDistPathUri = vscode.Uri.file(appDistPath);
        const baseUri = webviewPanel.webview.asWebviewUri(appDistPathUri);
        const indexPath = join(appDistPath, "index.html");
        var indexHtml = readFileSync(indexPath, {encoding: 'utf8'});
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);
        webviewPanel.webview.html = indexHtml;
        this.ownerDoc = document;

        this.registerCallbacks(document, webviewPanel);      
        
    }

    private registerCallbacks(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel){

        // document change event
        var curEvent = vscode.workspace.onDidChangeTextDocument(event => {
            if(event.document.uri.toString() === document.uri.toString() && this.ownerDoc != null)
                this.onDocumentChange(this.ownerDoc);
        });
        this.listeners.push(curEvent);

        webviewPanel.onDidDispose(() =>{
            for(let event of this.listeners){
                event.dispose();
            }
        });
    }

    private getDocumentSettings(uri: vscode.Uri): vscode.WorkspaceConfiguration {
        let result = vscode.workspace.getConfiguration('dbc', uri);
        return result;
    }

    private async onDocumentChange(document: vscode.TextDocument){
        console.log("top of parse");
        return Promise.race([
            this.getDocumentSettings(document.uri).then((settings) =>{
                this.parser.addConfig(settings);
                
                this.parser.parse(document.getText(), document.uri.toString());
            }),
            // TODO: don't think this timeout works?
            new Promise((resolve,reject) => 
                setTimeout(r =>{
                    console.warn("took too long to parse. Returning early");
                    return r;
                }, 1000)
            )
        ]);
    }

    private async onForceParse(uri: vscode.Uri){
        console.log("force parse");
        this.getDocumentSettings(uri).then((settings: vscode.WorkspaceConfiguration) =>{
            this.parser.addConfig(settings);
            var text = this.ownerDoc?.getText();
            if(text === undefined){
                return;
            }
            this.parser.parse(text, uri.toString(), true);
        });
    }
}

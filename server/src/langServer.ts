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

import {
    Connection, 
    TextDocuments,
    InitializeParams,
    DidChangeConfigurationNotification,
    DidChangeWatchedFilesParams,
    WorkspaceFoldersChangeEvent,
    TextDocumentChangeEvent,
    DidChangeConfigurationParams,
    DidChangeTextDocumentParams,
    DidCloseTextDocumentParams
} from 'vscode-languageserver';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';
import { DBCParser } from './parser';
import LanguageSettings from './settings';


// create connection for the server

interface serverCapabilities{
    config: boolean,
    workspaceFolder: boolean,
    diagnosticInformation: boolean
}

export class DBCServer {

    public static initialize(con: Connection, params: InitializeParams){
        return new DBCServer(con, params);
    }

    private capabilities: serverCapabilities;
    
    private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
    private connection: Connection;
    // private analyzer;
    private defaultSettings: LanguageSettings;
    private globalSettings: LanguageSettings;
    
    private documentSettings: Map<string, Thenable<LanguageSettings>>;

    private parser: DBCParser;

    private constructor(con: Connection, params: InitializeParams){
        let capabilities = params.capabilities;

        let hasConfigurationCapability: boolean = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        let hasWorkspaceFolderCapability: boolean = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        let hasDiagnosticRelatedInformationCapability: boolean = !!(
            capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation
        );

        let caps: serverCapabilities = {
            config: hasConfigurationCapability,
            workspaceFolder: hasWorkspaceFolderCapability,
            diagnosticInformation: hasDiagnosticRelatedInformationCapability
        }

        this.capabilities = caps;
        this.connection = con;
        this.defaultSettings = {silenceMapWarnings: false};
        this.globalSettings = this.defaultSettings;
        this.documentSettings = new Map();
        this.parser = new DBCParser(con);
    }
    
    public register(): void{
        this.documents.listen(this.connection);
        
        if(this.capabilities.config){
            this.connection.client.register(DidChangeConfigurationNotification.type, undefined);
        }
        
        this.connection.onDidChangeTextDocument((change: DidChangeTextDocumentParams)=>{
                    // console.log("top of parse");
            this.getDocumentSettings(change.textDocument.uri).then((settings) =>{
                this.parser.addConfig(settings);
                
                this.parser.parse(change.contentChanges[0].text, change.textDocument.uri);
            });
        });
        
        this.documents.onDidClose((event: TextDocumentChangeEvent<TextDocument>) => {
            console.log("close");
            this.documentSettings.delete(event.document.uri);
        });
       

        // this.connection.onDidChangeConfiguration((change: DidChangeConfigurationParams) =>{
        //     console.debug("config change", change);
        //     this.globalSettings = {
        //         silenceMapWarnings: change.settings.dbc.silenceMapWarnings
        //     }
    
        //     this.parser.addConfig(this.globalSettings);
        //     // recheck all files
        //     this.documents.all().forEach((doc) =>{
        //         this.parser.clearDiag(doc.uri);
        //         this.parser.parse(doc.getText(), doc.uri);
        //     });
        // });

        this.connection.onNotification("dbc/parseRequest", (uri: string) => {
            // console.log("force parse");
            this.getDocumentSettings(uri).then((settings) =>{
                this.parser.addConfig(settings);
                var text = this.documents.get(uri)?.getText();
                if(text === undefined){
                    return;
                }
                this.parser.parse(text, uri, true);
            });
        });
        
        this.connection.onDidCloseTextDocument((params: DidCloseTextDocumentParams) => {
            this.connection.sendNotification("dbc/closeFile", params.textDocument.uri);
        });
    }

    private getDocumentSettings(uri: string): Thenable<LanguageSettings> {
        if(!this.capabilities.config){
            return Promise.resolve(this.globalSettings)
        }else{
            let result = this.documentSettings.get(uri);

            if(!result){
                result = this.connection.workspace.getConfiguration({
                    scopeUri: uri,
                    section: 'dbc'
                });
                this.documentSettings.set(uri, result);
            }
            return result;
        }
    }

}

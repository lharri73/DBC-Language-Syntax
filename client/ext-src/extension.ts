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

import * as path from 'path';
import * as vscode from 'vscode';
import { DidChangeWorkspaceFoldersNotification, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';
import DBCPanel from './panel';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext){
    let serverModule = context.asAbsolutePath(path.join('server', 'dist', 'serverPack.js'));
    let debugOptions = {execArgv: ['--nolazy', '--inspect=6009']}; //runs in node's inspector mode so vscode can attach for debugging
    let serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{scheme: 'file', language: 'dbc'}],
        synchronize: {
            // Notify the server about file changes to '.dbc files contained in the vscode.workspace
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.dbc')
        }
    };

    client = new LanguageClient(
        'dbc',
        'dbc Language Server',
        serverOptions,
        clientOptions
    );
    // bind the callback function
    // client.onReady().then(()=> {
    // });
    
    client.start();
    vscode.commands.executeCommand('setContext', 'dbcLangSyntax.clientActive', true);
    
    var {a: registration, b: panel} = DBCPanel.register(context,client);
    context.subscriptions.push(registration);
    // register showPreview command for button
    context.subscriptions.push(
        vscode.commands.registerCommand('dbc.showPreview', ()=>{
            if(!vscode.window.activeTextEditor) return;
            if(!panel.panel){
                vscode.workspace.openTextDocument(vscode.window.activeTextEditor.document.uri).then(doc => {
                    const viewPanel = vscode.window.createWebviewPanel("dbc", "DBC Editor", {preserveFocus: true, viewColumn: vscode.ViewColumn.Beside});
                    panel.resolveCustomTextEditor(doc, viewPanel, <vscode.CancellationToken><unknown>null);
                });              
            }
        })
    );
}
    
export function deactivate(): Thenable<void> | undefined {
    if(!client)
        return undefined;
    return client.stop();
}

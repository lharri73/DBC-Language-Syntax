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
import { workspace, ExtensionContext, commands, window, ViewColumn } from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';
import DBCPanel from './dbcPanel';

let client: LanguageClient;

export function activate(context: ExtensionContext){
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
            // Notify the server about file changes to '.dbc files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.dbc')
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
    //     console.log("here?");
    //     context.subscriptions.push(DBCPanel.register(context,client));
    //     // client.onNotification("dbc/fileParsed", (result) =>{
    //     //     console.log("parsed inside");
    //     //     if(innerPannel != null)
    //     //         innerPannel.parsedDBC(result);
    //     //     else
    //     //         console.log("...but is closed")
    //     // });
    // });
    

    console.log("pre-start");
    console.log(client)
    client.start();
    console.log("post-start");
}
    
export function deactivate(): Thenable<void> | undefined {
    if(!client)
        return undefined;
    return client.stop();
}

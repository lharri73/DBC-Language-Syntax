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
    createConnection,
    Connection,
    InitializeParams,
    ProposedFeatures,
    InitializeResult,
    TextDocumentSyncKind
} from 'vscode-languageserver'

import DBCServer from './server'

let connection: Connection = createConnection(ProposedFeatures.all);
let hasWorkspaceFolderCapability: boolean = false;
let server: DBCServer;

connection.onInitialize((params: InitializeParams): InitializeResult =>{

    // initialize the dbc server
    server = DBCServer.initialize(connection, params);


    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,

            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true
            }
        }
    }

    if (hasWorkspaceFolderCapability){
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    
    return result;
});

connection.onInitialized(() =>{
    server.register();
})

connection.listen();

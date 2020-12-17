// Copyright (C) 2020 Landon Harris
// 
// This file is part of DBC Language Syntax.
// 
// DBC Language Syntax is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
// 
// DBC Language Syntax is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with DBC Language Syntax.  If not, see <http://www.gnu.org/licenses/>.


import {
    createConnection,
    Connection,
    InitializeParams,
    ProposedFeatures,
    InitializeResult,
    TextDocumentSyncKind,
    DidChangeConfigurationNotification,
    Event,
    WorkspaceFoldersChangeEvent
} from 'vscode-languageserver'

import DBCServer from './server'

let connection: Connection = createConnection(ProposedFeatures.all);
let hasConfigurationCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
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

connection.listen();

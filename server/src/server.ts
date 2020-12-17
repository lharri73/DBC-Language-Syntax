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
    TextDocuments,
    Diagnostic,
    DiagnosticSeverity,
    ProposedFeatures,
    InitializeParams,
    DidChangeConfigurationNotification,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult,
    DidChangeWatchedFilesParams,
    WorkspaceFoldersChangeEvent
} from 'vscode-languageserver';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';

// create connection for the server

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

interface ExampleSettings{
    maxNumberOfProblems: number;
}

interface serverCapabilities{
    config: boolean,
    workspaceFolder: boolean,
    diagnosticInformation: boolean
}

export default class DBCServer{
    public static initialize(con: Connection, params: InitializeParams): DBCServer{
        // create analyser here too
        let capabilities = params.capabilities;

        let hasConfigurationCapability: boolean = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        let hasWorkspaceFolderCapability: boolean = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        let hasDiagnosticRelatedInformationCapability: boolean = !!(
            capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation
        );

        let caps: serverCapabilities = {
            config: hasWorkspaceFolderCapability,
            workspaceFolder: hasWorkspaceFolderCapability,
            diagnosticInformation: hasDiagnosticRelatedInformationCapability
        }
        
        return new DBCServer(con, caps);
    }

    private capabilities: serverCapabilities;
    
    private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
    private connection: Connection;
    // private analyzer;
    private defaultSettings: ExampleSettings;
    private globalSettings: ExampleSettings;
    
    private documentSettings: Map<string, Thenable<ExampleSettings>>;

    private constructor(con: Connection, caps: serverCapabilities){
        this.capabilities = caps;
        this.connection = con;
        this.defaultSettings = {maxNumberOfProblems: 1000};
        this.globalSettings = this.defaultSettings;
        this.documentSettings = new Map();
    }
    
    public register(con: Connection): void{
        this.documents.listen(this.connection);
        
        con.onDidChangeWatchedFiles(this.onFileChange.bind(this));
        if(this.capabilities.config){
            this.connection.client.register(DidChangeConfigurationNotification.type, undefined);
        }
        if(this.capabilities.workspaceFolder){
            con.workspace.onDidChangeWorkspaceFolders(this.workspaceChange.bind(this));
        }
        
        // con.onHover(this.onHover.bind(this));
    }

    private onFileChange(change: DidChangeWatchedFilesParams){
        if(this.capabilities.config){
            this.documentSettings.clear();
        }else{
            this.globalSettings = <ExampleSettings>(
                (change.settings.dbc || this.defaultSettings)
            );
        }
        this.documents.all().forEach(validateTextDocument);
    }

    private workspaceChange(event: WorkspaceFoldersChangeEvent){
        this.connection.console.log('workspace folder change event received');
    }

    private 
}

// interface ExampleSettings{
//     maxNumberOfProblems: number;
// }

// const defaultSettings: ExampleSettings = {maxNumberOfProblems: 1000};
// let globalSettings: ExampleSettings = defaultSettings;

// let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

// connection.onDidChangeConfiguration(change => {
//     if(hasConfigurationCapability){
//         documentSettings.clear();
//     }else{
//         globalSettings = <ExampleSettings>(
//             (change.settings.dbc || defaultSettings)
//         );
//     }
//     documents.all().forEach(validateTextDocument);
// });

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
    if(!hasConfigurationCapability){
        return Promise.resolve(globalSettings);
    }

    let result = documentSettings.get(resource);
    
    if(!result){
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'dbc'
        });
        documentSettings.set(resource, result);
    }
    
    return result;
}

documents.onDidClose(e => {
    documentSettings.delete(e.document.uri);
})

documents.onDidChangeContent(change => {
    console.error("here");
    validateTextDocument(change.document);
})

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    let settings = await getDocumentSettings(textDocument.uri);

    let text = textDocument.getText();
    let pattern = /\b[A-Z]{2,}\b/g;
    let m: RegExpExecArray | null;

    let problems = 0;
    let diagnostics: Diagnostic[] = [];

    while((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems){
        problems++;
        let diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Warning,
            range: {
                start: textDocument.positionAt(m.index),
                end: textDocument.positionAt(m.index + m[0].length)
            },
            message: `${m[0]} is all uppercase.`,
            source: 'ex'
        };
        if (hasDiagnosticRelatedInformationCapability){
            diagnostic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range)
                    },
                    message: 'Spelling matters'
                },
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range)
                    },
                    message: 'Particularly for names'
                }
            ];
        }
        diagnostics.push(diagnostic);
    }

    // send to vs code
    connection.sendDiagnostics({uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
    console.log('we received an file change event');
})

connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    return [
        {
            label: 'TypeScript',
            kind: CompletionItemKind.Text,
            data: 1
        },
        {
            label: 'JavaScript',
            kind: CompletionItemKind.Text,
            data: 2
        }
    ]
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem =>{
    if(item.data == 1){
        item.detail = 'Typescript details';
        item.documentation = 'Typescript documentation';
    }else if (item.data == 2){
        item.detail = 'Javascript details';
        item.documentation = 'javascript documentation'
    }
    return item;
});

documents.listen(connection);

connection.listen();

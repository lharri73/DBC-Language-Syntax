"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// create connection for the server
let documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
class DBCServer {
    constructor(con, caps) {
        this.documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
        this.capabilities = caps;
        this.connection = con;
        this.defaultSettings = { maxNumberOfProblems: 1000 };
        this.globalSettings = this.defaultSettings;
        this.documentSettings = new Map();
    }
    static initialize(con, params) {
        // create analyser here too
        let capabilities = params.capabilities;
        let hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        let hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        let hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation);
        let caps = {
            config: hasWorkspaceFolderCapability,
            workspaceFolder: hasWorkspaceFolderCapability,
            diagnosticInformation: hasDiagnosticRelatedInformationCapability
        };
        return new DBCServer(con, caps);
    }
    register() {
        this.documents.listen(this.connection);
        if (this.capabilities.config) {
            this.connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type, undefined);
        }
        if (this.capabilities.workspaceFolder) {
            this.connection.workspace.onDidChangeWorkspaceFolders(this.workspaceChange.bind(this));
        }
        this.connection.onDidChangeWatchedFiles(this.onWatchFileChange.bind(this));
        this.connection.onDidChangeConfiguration(this.configChange.bind(this));
        this.connection.onCompletion(this.onCompletion.bind(this));
        this.connection.onCompletionResolve(this.onCompletionResolve.bind(this));
        this.documents.onDidClose(this.onDocumentClose.bind(this));
        this.documents.onDidChangeContent(this.onDocumentChange.bind(this));
        // con.onHover(this.onHover.bind(this));
    }
    configChange(change) {
        if (this.capabilities.config) {
            this.documentSettings.clear();
        }
        else {
            this.globalSettings = ((change.settings.dbc || this.defaultSettings));
        }
        // recheck all files
        this.documents.all().forEach(this.validateTextDocument);
    }
    onWatchFileChange(change) {
        console.log('watched files change event received');
    }
    workspaceChange(event) {
        console.log('workspace folder change event received');
    }
    getDocumentSettings(resource) {
        if (!this.capabilities.config) {
            return Promise.resolve(this.globalSettings);
        }
        else {
            let result = this.documentSettings.get(resource);
            if (!result) {
                result = this.connection.workspace.getConfiguration({
                    scopeUri: resource,
                    section: 'dbc'
                });
                this.documentSettings.set(resource, result);
            }
            return result;
        }
    }
    onDocumentClose(e) {
        this.documentSettings.delete(e.document.uri);
    }
    onDocumentChange(change) {
        console.log("here");
        this.validateTextDocument(change.document);
    }
    // TODO: move to validator
    async validateTextDocument(textDocument) {
        let settings = await this.getDocumentSettings(textDocument.uri);
        let text = textDocument.getText();
        let pattern = /\b[A-Z]{2,}\b/g;
        let m;
        let problems = 0;
        let diagnostics = [];
        while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
            problems++;
            let diagnostic = {
                severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
                range: {
                    start: textDocument.positionAt(m.index),
                    end: textDocument.positionAt(m.index + m[0].length)
                },
                message: `${m[0]} is all uppercase.`,
                source: 'ex'
            };
            if (this.capabilities.diagnosticInformation) {
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
        this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
    }
    onCompletion(position) {
        return [
            {
                label: 'TypeScript',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 1
            },
            {
                label: 'JavaScript',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 2
            }
        ];
    }
    onCompletionResolve(item) {
        if (item.data == 1) {
            item.detail = 'Typescript details';
            item.documentation = 'Typescript documentation';
        }
        else if (item.data == 2) {
            item.detail = 'Javascript details';
            item.documentation = 'javascript documentation';
        }
        return item;
    }
}
exports.default = DBCServer;
//# sourceMappingURL=server.js.map
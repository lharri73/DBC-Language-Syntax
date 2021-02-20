"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const dbcPanel_1 = require("./dbcPanel");
let client;
function activate(context) {
    let serverModule = context.asAbsolutePath(path.join('server', 'out', 'index.js'));
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }; //runs in node's inspector mode so vscode can attach for debugging
    let serverOptions = {
        run: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    let clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'dbc' }],
    };
    client = new vscode_languageclient_1.LanguageClient('dbc', 'dbc Language Server', serverOptions, clientOptions);
    client.start();
    context.subscriptions.push(vscode_1.commands.registerCommand('dbc.showPreview', () => {
        var _a;
        const innerPannel = new dbcPanel_1.default();
        // bind the callback function
        client.onNotification("dbc/fileParsed", innerPannel.parsedDBC.bind(innerPannel));
        // request to parse the current open document when the preview is opened
        client.sendNotification("dbc/parseRequest", (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.toString());
    }));
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
import * as path from 'path';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';
import ReactPanel from './panel';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	let serverModule = context.asAbsolutePath(path.join("server", "dist", "serverPack.js"));
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
	client.start();

	var {a: registration, b: panel} = DBCPanel.register(context,client);
    context.subscriptions.push(registration);
    // register showPreview command for button
    context.subscriptions.push(
        vscode.commands.registerCommand('dbc.showPreview', ()=>{

            if(!vscode.window.activeTextEditor?.document){
                console.log("bad things")
                return; // this should never happen with correct activation events
            }
                
            var openUri: vscode.Uri = vscode.window.activeTextEditor.document.uri;
            if(panel.client){
                panel.panel?.reveal(vscode.ViewColumn.Beside, true);
                client.sendNotification("dbc/parseRequest", openUri);
            }else{
                vscode.workspace.openTextDocument(openUri).then((doc: vscode.TextDocument) => {
                    var webPanel = vscode.window.createWebviewPanel('dbcPreview', 'DBC Preview', vscode.ViewColumn.Beside, {enableScripts: true});
                    var token = new vscode.CancellationTokenSource(); 
                    panel.resolveCustomTextEditor(doc, webPanel, token.token);
                });
            }
        })
    );

	context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
		ReactPanel.createOrShow(context.extensionPath);
	}));
}

/**
 * Manages react webview panels
 */

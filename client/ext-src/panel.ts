import { readFileSync } from "fs";
import { join } from "path";
import * as vscode from 'vscode'
import { LanguageClient } from "vscode-languageclient/node";
import { 
    Database,
} from "dbclib"


class DBCPanel implements vscode.CustomTextEditorProvider {
    private static readonly viewType = 'dbcLanguage.dbc';
    public panel: vscode.WebviewPanel | null;
    private _extensionPath: string;
    public client: LanguageClient | null;

    public static register(context: vscode.ExtensionContext, client: LanguageClient): {a: vscode.Disposable, b: DBCPanel}{
		const provider = new DBCPanel(context);
        provider.client = client;
		const providerRegistration = vscode.window.registerCustomEditorProvider(DBCPanel.viewType, provider);
		return {a: providerRegistration, b: provider};
	}

    public constructor(private readonly context: vscode.ExtensionContext){
        this._extensionPath = context.asAbsolutePath(join('client', 'build'));
        this.panel = null;
        this.client = null;
    }

    // public getPanel(){
    //     return this.panel;
    // }

	private _getHtmlForWebview() {
		const manifest = JSON.parse(readFileSync(join(this._extensionPath, 'asset-manifest.json'), {encoding: 'utf8'}));
		const mainScript:string = manifest['files']['main.js'];
		const mainStyle:string = manifest['files']['main.css'];

		const scriptPathOnDisk = vscode.Uri.file(join(this._extensionPath, mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		const stylePathOnDisk = vscode.Uri.file(join(this._extensionPath, mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(this._extensionPath).with({ scheme: 'vscode-resource' })}/">
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}

    public parsedDBC(received: string){
        //console.log("received dbc");
        if(this.panel == null)
            return;
        this.panel.webview.postMessage(received);
        // this.panel.webview.html = this._getHtmlForWebview();
    }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument, 
        webviewPanel: vscode.WebviewPanel, 
        _token: vscode.CancellationToken): 
        Promise<void>
    {
        // entrypoint
        
        webviewPanel.webview.options = {
            enableScripts: true,
			localResourceRoots: [
				vscode.Uri.file(this._extensionPath)
			]
        };
        
        this.panel = webviewPanel;
        webviewPanel.webview.html = this._getHtmlForWebview();

        this.registerCallbacks(document, webviewPanel);      
    }

    private registerCallbacks(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel){
        // document change event
        this.client?.onNotification("dbc/fileParsed", (result: string) => {
            webviewPanel.webview.postMessage(result);
        });
        this.client?.onNotification("dbc/closeFile", (uri: vscode.Uri) => {
            if(uri == document.uri){
                webviewPanel.dispose();
            }
        })
        this.client?.sendNotification("dbc/parseRequest", document.uri.toString());
        this.panel?.onDidDispose(() => {
            this.panel = null;
        });
    }
}

export default DBCPanel;

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

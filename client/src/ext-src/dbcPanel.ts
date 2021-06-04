 
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
    private appDistPath: string;
    public client: LanguageClient | null;

    public static register(context: vscode.ExtensionContext, client: LanguageClient): {a: vscode.Disposable, b: DBCPanel}{
		const provider = new DBCPanel(context);
        provider.client = client;
		const providerRegistration = vscode.window.registerCustomEditorProvider(DBCPanel.viewType, provider);
		return {a: providerRegistration, b: provider};
	}

    public constructor(private readonly context: vscode.ExtensionContext){
        this.appDistPath = context.asAbsolutePath(join('client', 'dist'));
        this.panel = null;
        this.client = null;
    }

    // public getPanel(){
    //     return this.panel;
    // }

    private genContent(){
        const appDistPathUri = vscode.Uri.file(this.appDistPath);

        const baseUri = this.panel?.webview.asWebviewUri(appDistPathUri);
        const indexPath = join(this.appDistPath, 'index.html');

        var indexHtml = readFileSync(indexPath, {encoding: 'utf8'});
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);

        return indexHtml;
    }

    public parsedDBC(received: string){
        console.debug("received dbc");
        if(this.panel == null)
            return;
        this.panel.webview.postMessage(received);
        this.panel.webview.html = this.genContent();
        // can we force a refresh here?
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
        };
        
        this.panel = webviewPanel;
        webviewPanel.webview.html = this.genContent();

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
    }
}

export default DBCPanel;

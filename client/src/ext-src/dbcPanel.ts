 
import { readFileSync } from "fs";
import { join } from "path";
import * as vscode from 'vscode'
import { LanguageClient } from "vscode-languageclient/node";
import { 
    Database,
    reviver
} from "dbclib"


class DBCPanel implements vscode.CustomTextEditorProvider {
    private static readonly viewType = 'angular';
    public panel: vscode.WebviewPanel | null;
    private extensionPath: string;
    public client: LanguageClient | null;

    public static register(context: vscode.ExtensionContext, client: LanguageClient): vscode.Disposable {
        console.log("register of panel");
		const provider = new DBCPanel(context);
        provider.client = client;
		const providerRegistration = vscode.window.registerCustomEditorProvider(DBCPanel.viewType, provider);
		return providerRegistration;
	}

    public constructor(private readonly context: vscode.ExtensionContext){
        this.extensionPath = join(__dirname, '..');
        this.panel = null;
        this.client = null;
    }

    // public getPanel(){
    //     return this.panel;
    // }

    private genContent(){
        const appDistPath = join(this.extensionPath, 'dist');
        const appDistPathUri = vscode.Uri.file(appDistPath);

        const baseUri = this.panel?.webview.asWebviewUri(appDistPathUri);
        const indexPath = join(appDistPath, 'index.html');
        var indexHtml = readFileSync(indexPath, {encoding: 'utf8'});
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);
        
        return indexHtml;
    }

    public parsedDBC(received: string){
        console.log("received dbc");
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

        webviewPanel.webview.options = {
            enableScripts: true,
        };

        webviewPanel.webview.html = this.genContent();

        this.panel = webviewPanel;
        this.registerCallbacks(document, webviewPanel);      
    }

    private registerCallbacks(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel){
        var disposed:boolean = false;
        // document change event
        var curEvent = this.client?.onNotification("dbc/fileParsed", (result: string) => {
            if(!disposed){
                webviewPanel.webview.postMessage(result);
            }
        });

        webviewPanel.onDidDispose(() =>{
            disposed = true;
        });
    }
}

export default DBCPanel;

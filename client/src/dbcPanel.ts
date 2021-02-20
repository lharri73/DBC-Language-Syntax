import { ViewColumn, WebviewPanel, window } from "vscode";
import { Message } from "vscode-languageclient";
import { Database } from "../../server/out/dbc/db"
import { reviver } from "../../server/out/mapTools";

export default class DBCPanel{
    private panel: WebviewPanel;
    private curDb: Database | null;

    public constructor(){
        this.panel = window.createWebviewPanel(
            'dbcPreview',
            'DBC Preview',
            ViewColumn.Beside,
            {}
        );
        
        this.panel.onDidDispose(this.cleanup.bind(this));
        this.curDb = null;
        this.panel.webview.html = this.genContent();
    }

    // public getPanel(){
    //     return this.panel;
    // }


    public cleanup(){
        // ?
    }

    private genContent(){
        if(this.curDb == null)
            return this.header() + this.footer();
        
        var ret: string = this.header();
        ret += `<h1>${this.curDb.version}</h1>`;
        this.curDb.messages.forEach((msg,id) => {
            ret += msg.represent();
        });
        ret += this.footer();
        return ret;
    }

    private header(){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DBC Preview</title>
        </head>
        <body>
        `;
    }

    public parsedDBC(received: string){
        this.curDb = JSON.parse(received, reviver);
        this.panel.webview.html = this.genContent();
    }

    private footer(){
        return `
        </body>
        </html>`;
    }
}

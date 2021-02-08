import { ViewColumn, WebviewPanel, window } from "vscode";
import { Message } from "vscode-languageclient";
import { Database } from "../../server/out/dbc/db"

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
        this.panel.webview.html = this.genContent();
        this.curDb = null;
    }

    // public getPanel(){
    //     return this.panel;
    // }

    public cleanup(){
        // ?
    }

    private genContent(){
        if(this.curDb == null || typeof(this.curDb.messages) == 'string')
            return this.header() + this.footer();
        
        var ret: string = this.header();
        this.curDb.messages.forEach((msg,id) => {
            console.log(msg);
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

    public parsedDBC(received: Database){
        console.log("received");
        this.curDb = new Database();
        this.curDb.fromString(received);
        console.log(received);
        console.log(this.curDb);
        this.panel.webview.html = this.genContent();
    }

    private footer(){
        return `
        </body>`;
    }
}

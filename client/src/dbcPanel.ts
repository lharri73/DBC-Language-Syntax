import { ViewColumn, WebviewPanel, window } from "vscode";
import { Database } from "../../server/src/dbc/db"

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
        if(this.curDb == null)
            return this.header() + this.footer();
        
        var ret: string = this.header();
        this.curDb.messages.forEach((msg) =>{
            ret += msg.represent();
        });
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

    public parsedDBC(db: Database){
        console.log("received");
        this.curDb = db;
    }

    private footer(){
        return `
        </body>`;
    }
}

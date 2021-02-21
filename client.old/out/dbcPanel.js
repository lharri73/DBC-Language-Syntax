"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const mapTools_1 = require("../../server/out/mapTools");
class DBCPanel {
    constructor() {
        this.panel = vscode_1.window.createWebviewPanel('dbcPreview', 'DBC Preview', vscode_1.ViewColumn.Beside, {});
        this.panel.onDidDispose(this.cleanup.bind(this));
        this.curDb = null;
        this.panel.webview.html = this.genContent();
    }
    // public getPanel(){
    //     return this.panel;
    // }
    cleanup() {
        // ?
    }
    genContent() {
        if (this.curDb == null)
            return this.header() + this.footer();
        var ret = this.header();
        ret += `<h1>${this.curDb.version}</h1>`;
        this.curDb.messages.forEach((msg, id) => {
            ret += msg.represent();
        });
        ret += this.footer();
        return ret;
    }
    header() {
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
    parsedDBC(received) {
        this.curDb = JSON.parse(received, mapTools_1.reviver);
        this.panel.webview.html = this.genContent();
    }
    footer() {
        return `
        </body>
        </html>`;
    }
}
exports.default = DBCPanel;
//# sourceMappingURL=dbcPanel.js.map
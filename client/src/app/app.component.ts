import { Component, HostListener, OnInit } from '@angular/core';
import { reviver } from "../../../server/out/mapTools.js";
import { Database } from "../../../server/out/dbc/db.js"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private db: Database | null;
    constructor(){
        this.db = null;
    }

    @HostListener('window:message', ['$event'])
    handleMessage(event: MessageEvent){
        this.db = JSON.parse(event.data, reviver);
    }
  
    title = 'VSCode Webview Angular';
}

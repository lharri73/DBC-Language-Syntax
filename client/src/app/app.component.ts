import { Component, HostListener, OnInit } from '@angular/core';
import { reviver } from "../../../server/out/mapTools.js";
import { Database } from "../../../server/out/dbc/db.js";
import {Uri} from 'vscode'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private db: Database | null;
    public title: string;
    constructor(){
        this.db = null;
        this.title = "DBC Preview";
    }

    @HostListener('window:message', ['$event'])
    handleMessage(event: MessageEvent){
        this.db = JSON.parse(event.data, reviver);
        var pth = this.db.fileName;
        console.log('here', pth);
        var pthStr = pth.split('/');
        
        this.title = pthStr[pthStr.length - 1];
    }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { reviver } from "../../../server/out/mapTools.js";
import { Database } from "../../../server/out/dbc/db.js";

import { fromEvent, Observable, Subject, of } from 'rxjs';
import { Message } from '../../../server/out/dbc/message.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public msgObservable: Observable<Message[]>;
    public title: string;

    private db: Database;
    private messages: Subject<Message[]>
    
    constructor(){
        this.db = new Database();
        this.title = "DBC Preview";
        this.messages = new Subject<Message[]>();
        this.msgObservable = this.messages.asObservable();
    }

    // @HostListener('window:message', ['$event'])
    // handleMessage(event: MessageEvent){
    //     this.db = JSON.parse(event.data, reviver);
    //     var pth = this.db.fileName;
    //     console.log('here', pth);
    //     var pthStr = pth.split('/');
        
    //     this.title = pthStr[pthStr.length - 1];
    // }

    ngOnInit(){
        const msg = fromEvent(window, 'message');
        msg.subscribe((event: MessageEvent) =>{
            var db = JSON.parse(event.data, reviver);
            this.db = db;
            var pth = db.fileName;
            var pthStr = pth.split('/');
            this.title = pthStr[pthStr.length - 1];
            
            this.messages.next(db.messages.values());
        });
    }
}

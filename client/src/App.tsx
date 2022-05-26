/*
 * Copyright (C) 2022 Landon Harris
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; version 2.
 * 
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see 
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
 */
import React from "react";
import './App.css';

import loading from './loading.svg'
import { decodeDb,Database, Message } from 'dbclib';
import {URI, Utils} from 'vscode-uri';

import MessageComp from './dbcParts/Message'

interface Props {}

interface State {
    db: Database;
    loading: boolean;
    errorState: number;
    searchValue: string;
    messages: JSX.Element[];
    msgRefs: React.RefObject<MessageComp>[];
}

class App extends React.Component<Props,State> {
    timer: any;
    constructor(props: Props) {
        super(props);
        this.state={
            db: new Database(),
            loading: true,
            errorState: 0,
            searchValue: "",
            messages: [],
            msgRefs: []
        };
        this.timer = null;
    }

    render() {
        if(this.state.loading){
            return(
                <div className="Loading">
                    <img src={loading} className="LoadingSVG" alt="loading" />
                    <h1 className="App-title">Loading DBC</h1>
                </div>
            )
        }else if(this.state.errorState == 1){
            return(
                <div className="Loading">
                    <h1 className="Error">DBC too large to parse (known bug)</h1>
                    <p>Encoded representation of parsed DBC is too large for VSCode message passing</p>
                </div>
            )
        }else if(this.state.errorState == 2){
            return(
                <div className="Loading">
                    <h1 className="Error">Uh oh...Something strange is afoot</h1>
                    <p>It seems the parser gave up on sending your file to the display panel. Have you tried turning it off and back on?</p>
                    <p>(Just close this window and open it again with the inspect icon)</p>
                </div>
            )
        }

        // used when there is no version on the file so there's not just empty space.
        var version_placeholder = <i>None</i>;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">File: {Utils.basename(URI.parse(this.state.db.fileName))}</h1>
                    <h2>Version: {this.state.db.version == "" ? version_placeholder : this.state.db.version}</h2>
                    <input
                        value={this.state.searchValue}
                        onChange={e => this.filterChange(e.target.value)}
                        placeholder="Search (Message Name, id_hex, id_dec)"
                        className="searchBox"
                    />
                    <hr className="bigSeperator" />
                    
                    {this.state.messages.map(component => component)}
                </header>
            </div>
        );
    }

    filterChange(newVal: string){
        this.setState({searchValue: newVal});
        if(newVal == ""){
            this.state.msgRefs.forEach((ref) =>{
                ref.current?.setState({enabled: true});
            });
            return;
        }
        this.state.msgRefs.forEach((ref) =>{
            if(ref.current?.search(newVal))
                ref.current?.setState({enabled: true});
            else
                ref.current?.setState({enabled: false});
        })
    }

    componentDidMount() {
        window.addEventListener(
            "message",
            (ev: MessageEvent) => {
                clearTimeout(this.timer);
                if(ev.data == "OVERLOADED STRING"){
                    this.setState({
                        errorState: 1,
                        loading: false,
                    })
                }else{
                    let db = decodeDb(ev.data);
                    var messages:JSX.Element[] = [];
                    var msgRefs: React.RefObject<MessageComp>[] = [];
                    console.log("decoded here", db);
                    db.messages.forEach((msg) =>{
                        let curRef:React.RefObject<MessageComp> = React.createRef();
                        messages.push(
                            <MessageComp msg={msg} ref={curRef}/>
                        );
                        msgRefs.push(curRef);
                    });
                    messages.sort((a,b)=>{return a.props.msg.id  - b.props.msg.id});
                    this.setState({
                        messages: messages,
                        msgRefs: msgRefs,
                        db: db,
                        loading: false,
                        errorState: 0,
                    });
                }
            }
        );
        this.timer = setTimeout(()=>{
            this.setState({errorState: 2, loading: false});
        }, 5000);
    }
}

export default App;

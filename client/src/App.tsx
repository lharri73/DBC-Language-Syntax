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
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">File: {Utils.basename(URI.parse(this.state.db.fileName))}</h1>
                    <h2>Version: {this.state.db.version}</h2>
                    <input
                        value={this.state.searchValue}
                        onChange={e => this.setState({searchValue: e.target.value})}
                        placeholder="Search Filter"
                        className="searchBox"
                    />
                    <hr className="bigSeperator" />
                    {this.state.messages.map(componenet => componenet)}
                </header>
            </div>
        );
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
                    console.log("decoded here", db);
                    db.messages.forEach((msg) =>{
                        messages.push(
                            <MessageComp msg={msg} />
                        );
                    });
                    messages.sort((a,b)=>{return a.props.msg.id  - b.props.msg.id});
                    this.setState({
                        messages: messages,
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

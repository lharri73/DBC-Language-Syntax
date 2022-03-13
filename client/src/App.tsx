import React from "react";
import './App.css';

import logo from './logo.svg'
import loading from './loading.svg'
import { decodeDb,Database } from 'dbclib';

interface Props {}

interface State {
    db: Database;
    loading: boolean;
    errorState: number;
}

class App extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state={
            db: new Database(),
            loading: true,
            errorState: 0
        };
    }
    render() {
        if(this.state.loading){
            return(
                <div className="App">
                    <img src={loading} className="LoadingSVG" alt="loading" />
                    <h1 className="App-title">Loading DBC</h1>
                </div>
            )
        }
        if(this.state.errorState == 1){
            return(
                <div className="App">
                    <h1 className="Error">DBC too large to parse (known bug)</h1>
                    <p>Encoded representation of parsed DBC is too large for VSCode message passing</p>
                </div>
            )
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener(
            "message",
            (ev: MessageEvent) => {
                if(ev.data == "OVERLOADED STRING"){
                    this.setState({
                        errorState: 1,
                        loading: false,
                    })
                }else{
                    this.setState({
                        db:decodeDb(ev.data),
                        loading: false,
                        errorState: 0,
                    });
                }
                console.log(this.state.db);
            }
        );
    }
}

export default App;

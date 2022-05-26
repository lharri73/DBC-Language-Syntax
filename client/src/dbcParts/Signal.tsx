import React from 'react';
import './Signal.css';
import {Signal, Message} from 'dbclib';
import { ProposedFeatures } from 'vscode-languageclient';

interface Props{
    sig: Signal
};
interface State{
}

export default class SignalComp extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <div>
                <p>{this.props.sig.name} {this.props.sig.unit == "" ? "" : `(${this.props.sig.unit})`}</p>
            </div>
        )
    }
}

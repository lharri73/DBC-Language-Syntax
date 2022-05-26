import React from "react";
import './Message.css';
import {Message} from 'dbclib';
import SignalComp from './Signal'

interface Props {
    msg: Message
}
interface State{
    expanded: boolean,
    sigs: React.ReactNode[]
}

class MessageComp extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);

        let signals: React.ReactNode[] = [];
        for(const signal of props.msg.signals.values()){
            signals.push(
                <SignalComp sig={signal}/>
            )
        }

        this.state = {
            expanded: false,
            sigs: signals
        }
    }

    render(): React.ReactNode {
        return(
            <div>
                <h1 className="MessageID">{this.props.msg.represent()}: </h1>
                <div className="arrow-right expandSignal" onClick={(e)=>this.expandDiv()}/>
                <p className="signalNum expandSignal" onClick={(e)=>this.expandDiv()}
                >{this.props.msg.signals.size} signal{this.props.msg.signals.size > 1 ? 's' : ''}</p>
                <div className="signalDetails" style={{display: (this.state.expanded ? "block" : "none")}}>
                    {this.state.sigs}
                </div>
            </div>
        )
    }

    expandDiv(){
        this.setState({expanded: !this.state.expanded})
    }
}

export default MessageComp;

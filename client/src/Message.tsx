import React from "react";
import './Message.css';
import {Message} from 'dbclib';

interface Props {
    msg: Message
}
interface State{

}

class MessageComp extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <div>
                <h1 className="MessageID">{this.props.msg.represent()}: </h1>
                <div className="arrow-right expandSignal"/>
                <p className="signalNum expandSignal">{this.props.msg.signals.size} signals</p>
                <div className="signalDetails">
                    <p>Some garbage</p>
                    <p>Some garbage</p>
                    <p>Some garbage</p>
                </div>
            </div>
        )
    }
}

export default MessageComp;

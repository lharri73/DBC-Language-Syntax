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
                <div className="nameContainer">
                    <h1 className="MessageID">{this.props.msg.id} (0x{this.props.msg.id.toString(16)}): </h1>
                    <h1 className="MessageName">{this.props.msg.name}</h1> <br/>
                </div>
                <div className="arrow-right"/><p>{this.props.msg.signals.size} signals</p>
            </div>
        )
    }
}

export default MessageComp;

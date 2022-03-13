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
                <h1 className="MessageName">{this.props.msg.id} (0x{this.props.msg.id.toString(16)}): {this.props.msg.name}</h1>
            </div>
        )
    }
}

export default MessageComp;

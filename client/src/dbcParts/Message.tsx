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
import './Message.css';
import {Message} from 'dbclib';
import SignalComp from './Signal'

interface Props {
    msg: Message,
    ref: React.RefObject<MessageComp>
}
interface State{
    expanded: boolean,
    sigs: React.ReactNode[],
    enabled: boolean
}

class MessageComp extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);

        let signals: React.ReactNode[] = [];
        console.log(props.msg.signals);
        for(const signal of props.msg.signals.values()){
            signals.push(
                <SignalComp sig={signal}/>
            )
        }

        this.state = {
            expanded: false,
            sigs: signals,
            enabled: true
        }
    }

    render(): React.ReactNode {
        if(this.state.enabled){
            return(
                <div>
                    <h1 className="MessageID">{this.props.msg.represent()}: </h1>
                    <div className={`arrow-right expandSignal ${this.state.expanded ? "rotateArrow" : ""}`} onClick={(e)=>this.expandDiv()}/>
                    <p className="signalNum expandSignal" onClick={(e)=>this.expandDiv()}
                    >{this.props.msg.signals.size} signal{this.props.msg.signals.size > 1 ? 's' : ''}</p>
                    <div className="signalDetails" style={{display: (this.state.expanded ? "block" : "none")}}>
                        {this.state.sigs}
                    </div>
                </div>
            )
        }else{
            return(<></>)
        }
    }

    expandDiv(){
        this.setState({expanded: !this.state.expanded})
    }

    search(criteria: string): boolean{
        // search by base 10
        let match_10: boolean = this.props.msg.id == parseInt(criteria, 10);
        // search by base 16
        let match_hex: boolean = this.props.msg.id == parseInt(criteria, 16);
        // search by name
        let match_name: boolean = this.props.msg.name.includes(criteria);
        return (match_10 || match_hex || match_name);
    }

}

export default MessageComp;

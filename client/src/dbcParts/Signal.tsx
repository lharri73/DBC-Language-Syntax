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

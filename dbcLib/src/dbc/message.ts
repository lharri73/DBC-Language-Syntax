/**
 * Copyright (C) 2021 Landon Harris
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

import { Attribute } from "./attributes";
import { Signal, SignalGroup } from "./signal";

export class Message{
    public constructor(endLineNum: number,
                       Id: number,
                       Name: string, 
                       Size: number,
                       Transmitter: string,
                       Signals: Map<string,Signal>){
        this.id = Id;
        this.name = Name;
        this.size = Size;
        this.transmitter = Transmitter;
        this.signals = Signals;
        this.comment = "";
        this.transmitters = [];
        this.signalGroups = new Map();
        this.attributes = new Map();
        this.endNum = endLineNum;
        // this.signalStr = "";
        // this.sigGroupStr = "";
        // this.attributeStr = "";
        // this.transmitterStr = "";
    }

    public id: number;
    public name: string;
    public size: number;
    public transmitter: string;
    public transmitters: string[];
    public signals: Map<string,Signal>;
    public comment: string;
    public signalGroups: Map<string,SignalGroup>;
    public attributes: Map<string,Attribute>;

    private endNum: number;

    get lineNum(): number{
        return this.endNum - this.signals.size;
    }

    public represent(): string{
        var hex = this.id.toString(16).padStart(3, "000");
        var dec = this.id.toString(10).padStart(4, "0000");
        return `
        <h2>0x${hex} (${dec}) ${this.name}</h2>
        `
    }

    // public signalStr: string;
    // public sigGroupStr: string;
    // public attributeStr: string;
    // public transmitterStr: string;

    // public toString(){
    //     this.signalStr = encode(JSON.stringify(this.signals, replacer));
    //     this.sigGroupStr = encode(JSON.stringify(this.signalGroups, replacer));
    //     this.attributeStr = encode(JSON.stringify(this.attributes, replacer));
    //     this.transmitterStr = encode(JSON.stringify(this.transmitters, replacer));
    // }
    // public fromString(value: string){
    //     this.id = parseInt(value[0]);
    //     this.name = value[1];
    //     this.size = parseInt(value[2]);
    //     this.transmitter = value[3];
    //     this.transmitters = JSON.parse(decode(value[4]), reviver);
    //     this.signals = JSON.parse(decode(value[5]), reviver);
    //     this.comment = value[6];
    //     this.signalGroups = JSON.parse(decode(value[7]), reviver);
    //     this.attributes = JSON.parse(decode(value[8]), reviver);
    // }
}

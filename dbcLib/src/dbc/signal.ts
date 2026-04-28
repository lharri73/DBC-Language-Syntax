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
import { ValTable } from "./valtable";

export class Signal {
    public constructor(lineNo: number,
                       Name: string, 
                       Start: number, 
                       Size: number, 
                       Order: boolean, 
                       Type: boolean, 
                       Factor: number, 
                       Offset: number, 
                       Min: number, 
                       Max: number, 
                       Unit: string,
                       Receivers: string[],
                       MultiplexIndicator: string | null = null){
        this.name = Name;
        this.startBit = Start;
        this.bitSize = Size;
        this.byteOrder = Order;
        this.valueType = Type;
        this.factor = Factor;
        this.offset = Offset;
        this.minimum = Min;
        this.maximum = Max;
        this.unit = Unit;
        this.receivers = Receivers;
        this.valTable = null;
        this.comment = "";
        this.attributes = new Map();
        this.lineNum = lineNo;
        this.clsType = "signal";
        this.multiplexIndicator = MultiplexIndicator;
    }

    public name: string;
    public startBit: number;
    public bitSize: number;
    public byteOrder: boolean; // true: little, false: big
    public valueType: boolean; // true: signed, false: unsigned
    public factor: number;
    public offset: number;
    public minimum: number;
    public maximum: number;
    public unit: string;
    public receivers: string[];
    public valTable: ValTable | null;
    public comment: string;
    public attributes: Map<string,Attribute>;
    public lineNum: number;
    public clsType: string;
    public multiplexIndicator: string | null; // null: no multiplex, 'M': multiplexor, 'mX': multiplexed signal
}

export class SignalType{
    public constructor(name: string, 
                       size: number,
                       byteOrder: boolean,
                       valueType: boolean,
                       factor: number,
                       offset: number,
                       min: number,
                       max: number,
                       unit: string,
                       defaultVal: number,
                       valTable: string){
        this.name = name;
        this.size = size;
        this.byteOrder = byteOrder;
        this.valueType = valueType;
        this.factor = factor;
        this.offset = offset;
        this.minimum = min;
        this.maximum = max;
        this.unit = unit;
        this.default = defaultVal;
        this.valTable = valTable;
        this.clsType = "signalType";

    }
    public name: string;
    public size: number;
    public byteOrder: boolean; // true: little, false: big
    public valueType: boolean; // true: signed, false: unsigned
    public factor: number;
    public offset: number;
    public minimum: number;
    public maximum: number;
    public unit: string;
    public default: number;
    public valTable: string;    // name of valtable
    public clsType: string;
}

export class SignalGroup{
    public constructor(){
        this.messageId = 0;
        this.name = "";
        this.repetitions = 0;
        this.signals = [];
        this.clsType = "signalGroup";
    }
    public messageId: number;
    public name: string;
    public repetitions: number;
    public signals: string[];
    public clsType: string;
}

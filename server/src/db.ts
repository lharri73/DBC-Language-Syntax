/**
 * Copyright (C) 2020 Landon Harris
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
export class Signal {
    public constructor(Name: string, 
                       Start: number, 
                       Size: number, 
                       Order: boolean, 
                       Type: boolean, 
                       Factor: number, 
                       Offset: number, 
                       Min: number, 
                       Max: number, 
                       Unit: string,
                       Receivers: string[]){
        this.name = Name;
        this.startBit = Start;
        this.bitSize = Size;
        this.byteOrder = Order;
        this.valueType = Type;
        this.factor = Factor;
        this.offset = Offset;
        this.minimun = Min;
        this.maximum = Max;
        this.unit = Unit;
        this.receivers = Receivers;
        this.valTable = null;
    }

    public name: string;
    public startBit: number;
    public bitSize: number;
    public byteOrder: boolean; // true: little, false: big
    public valueType: boolean; // true: signed, false: unsigned
    public factor: number;
    public offset: number;
    public minimun: number;
    public maximum: number;
    public unit: string;
    public receivers: string[];
    public valTable: ValTable | null;
}

export class Message{
    public constructor(Id: number,
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
    }
    public id: number;
    public name: string;
    public size: number;
    public transmitter: string;
    public transmitters: string[];
    public signals: Map<string,Signal>;
    public comment: string;

}

export interface BitTiming{
    baudRate: number,
    register_1: number,
    register_2: number
};

export class Database{
    public constructor(){
        this.messages = new Map();
        this.valTables = new Map();
        this.version = "";
        this.symbols = [];
        this.parseErrors = [];
        this.bitTiming = {
            baudRate: -1,
            register_1: -1,
            register_2: -1
        };
        this.nodes = new Map();
    }

    public messages: Map<number, Message>;
    public version: string;
    public symbols: string[];
    public parseErrors: DBCParseError[];
    public bitTiming: BitTiming;
    public valTables: Map<string,ValTable>;
    public nodes: Map<string,Node>;
}

//----------------------

export class Node{
    public constructor(){
        this.name = "";
    }

    public name: string;
}

export class ValTable{
    public constructor(name: string){
        this.name = name;
        this.descriptions = new Map();
    }
    public name: string;
    public descriptions: Map<any,any>;
}

export class DBCParseError{
    public constructor(line: number, what: string){
        this.line = line;
        this.what = what;
    }
    public what: string;
    public line: number;
}

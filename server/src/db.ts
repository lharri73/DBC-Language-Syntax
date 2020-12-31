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
        this.comment = "";
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
    public comment: string;
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
        this.signalGroups = new Map();
    }
    public id: number;
    public name: string;
    public size: number;
    public transmitter: string;
    public transmitters: string[];
    public signals: Map<string,Signal>;
    public comment: string;
    public signalGroups: Map<string,SignalGroup>;
}

export class EnvironmentVariable{
    public constructor(){
        this.name = "";
        this.type = 2;
        this.min = -1;
        this.max = 0;
        this.unit = "";
        this.initialVal = 0;
        this.id = 0;
        this.transmitters = [];
        this.valueDescriptions = new Map();
        this.dataSize = 0; // used when ENVVAR_DATA is present
        this.comment = "";
    }
    public name: string;
    public type: number; // 0: integer, 1: float, 2: string, 3: data(ENVVAR_DATA)
    public min: number;
    public max: number;
    public unit: string;
    public initialVal: number;
    public id: number;
    public transmitters: string[];
    public valueDescriptions: Map<string,ValTable>;
    public dataSize: number;
    public comment: string;
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
}

class SignalGroup{
    public constructor(){
        this.messageId = 0;
        this.name = "";
        this.repetitions = 0;
        this.signals = [];
    }
    public messageId: number;
    public name: string;
    public repetitions: number;
    public signals: string[];
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
        this.environmentVariables = new Map();
        this.signalTypes = new Map();
        this.comment = "";
    }

    public messages: Map<number, Message>;
    public version: string;
    public symbols: string[];
    public parseErrors: DBCParseError[];
    public bitTiming: BitTiming;
    public valTables: Map<string,ValTable>;
    public nodes: Map<string,Node>;
    public environmentVariables: Map<string,EnvironmentVariable>;
    public signalTypes: Map<string,SignalType>;
    public comment: string;
}

//----------------------

export class Node{
    public constructor(){
        this.name = "";
        this.comment = "";
    }

    public name: string;
    public comment: string;
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

export class ValueType{
    public constructor(type: number){
        this.type = type;
        this.min = 0;
        this.max = 0;
        this.enumVals = [];
    }
    public type: number;
    public min: number;
    public max: number;
    public enumVals: string[];
}

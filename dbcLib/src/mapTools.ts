/**
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

import { encode, decode, ExtensionCodec } from '@msgpack/msgpack'

import { Database } from "./dbc/db";
import { Message } from "./dbc/message";
import { Node }  from './dbc/dbcNode';
import { 
    ValTable, 
    ValueType 
} from "./dbc/valtable";
import { 
    Attribute, 
    AttributeDef 
} from "./dbc/attributes";
import { EnvironmentVariable } from "./dbc/ev";
import { Signal, SignalGroup, SignalType } from "./dbc/signal";
import * as b64 from 'js-base64';


// DBCError elided
export var extensionCodec = new ExtensionCodec();

// Attribute
extensionCodec.register({
    type: 2,
    encode: (input: any): Uint8Array | null => {
        if (input?.clsType == "attribute"){
            let object = input as Attribute;
            var name: Uint8Array = encode(object.name, {extensionCodec});
            var type: Uint8Array = encode(object.type, {extensionCodec});
            var value: Uint8Array = encode(object.value, {extensionCodec});
            return encode([name, type, value], {extensionCodec});
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        return new Attribute(
            decode(array[0], {extensionCodec}) as string,
            decode(array[1], {extensionCodec}) as number,
            decode(array[2], {extensionCodec}));
    }
});

// AttributeDef
extensionCodec.register({
    type: 3,
    encode: (input: any): Uint8Array | null => {

        if (input?.clsType == "attributeDef"){
            let object = input as AttributeDef;
            var name: Uint8Array = encode(object.name, {extensionCodec});
            var type: Uint8Array = encode(object.objType, {extensionCodec});
            var value: Uint8Array = encode(object.valType, {extensionCodec});
            return encode([name, type, value], {extensionCodec});
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        return new AttributeDef(
            decode(array[0], {extensionCodec}) as string,
            decode(array[1], {extensionCodec}) as number,
            decode(array[2], {extensionCodec}) as ValueType
        );
    }
});

// Node
extensionCodec.register({
    type: 4,
    encode: (input: any): Uint8Array | null => {
        if (input?.clsType == "node"){
            let object = input as Node;
            var name: Uint8Array = encode(object.name, {extensionCodec});
            var comment: Uint8Array = encode(object.comment, {extensionCodec});
            var attributes: Uint8Array = encode(object.attributes, {extensionCodec});
            return encode([name, comment, attributes], {extensionCodec});
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new Node(decode(array[0], {extensionCodec}) as string);
        ret.comment = decode(array[1], {extensionCodec}) as string;
        ret.attributes = decode(array[2], {extensionCodec}) as Map<string,Attribute>;
        return ret;
    }
})

// Environment Variable
extensionCodec.register({
    type: 5,
    encode: (input: any): Uint8Array | null => {
        if(input?.clsType == "environmentVariable"){
            let object = input as EnvironmentVariable;
            var name: Uint8Array = encode(object.name, {extensionCodec});
            var type: Uint8Array = encode(object.type, {extensionCodec});
            var min: Uint8Array = encode(object.min, {extensionCodec});
            var max: Uint8Array = encode(object.max, {extensionCodec});
            var unit: Uint8Array = encode(object.unit, {extensionCodec});
            var initialVal: Uint8Array = encode(object.initialVal, {extensionCodec});
            var id: Uint8Array = encode(object.id, {extensionCodec});
            var transmitters: Uint8Array = encode(object.transmitters, {extensionCodec})
            var valueDescriptions: Uint8Array = encode(object.valueDescriptions, {extensionCodec});
            var dataSize: Uint8Array = encode(object.dataSize, {extensionCodec});
            var comment: Uint8Array = encode(object.comment, {extensionCodec});
            var attributes: Uint8Array = encode(object.attributes, {extensionCodec});
            return(encode([name, type, min, max, unit, initialVal, id, transmitters, valueDescriptions, dataSize, comment, attributes]));
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new EnvironmentVariable();
        ret.name = decode(array[0], {extensionCodec}) as string;
        ret.type = decode(array[1], {extensionCodec}) as number;
        ret.min = decode(array[2], {extensionCodec}) as number;
        ret.max = decode(array[3], {extensionCodec}) as number;
        ret.unit = decode(array[4], {extensionCodec}) as string;
        ret.initialVal = decode(array[5], {extensionCodec}) as number;
        ret.id = decode(array[6], {extensionCodec}) as number;
        ret.transmitters = decode(array[7], {extensionCodec}) as string[];
        ret.dataSize = decode(array[8], {extensionCodec}) as number;
        ret.comment = decode(array[9], {extensionCodec}) as string;
        ret.attributes = decode(array[10], {extensionCodec}) as Map<string,Attribute>;
        return ret;
    }
});

// message
extensionCodec.register({
    type: 6,
    encode: (input: any): Uint8Array | null => {
        if(input?.clsType == "message"){
            let object = input as Message;
            const id: Uint8Array = encode(object.id, {extensionCodec});
            const name: Uint8Array = encode(object.name, {extensionCodec});
            const size: Uint8Array = encode(object.size, {extensionCodec});
            const transmitter: Uint8Array = encode(object.transmitter, {extensionCodec});
            const transmitters: Uint8Array = encode(object.transmitters, {extensionCodec});
            const signals: Uint8Array = encode(object.signals, {extensionCodec});
            const comment: Uint8Array = encode(object.comment, {extensionCodec});
            const signalGroups: Uint8Array = encode(object.signalGroups, {extensionCodec});
            const attributes: Uint8Array = encode(object.attributes, {extensionCodec});
            return encode([id, name, size, transmitter, transmitters, signals, comment, signalGroups, attributes], {extensionCodec});
        }else
            return null
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new Message(
            0, // endLineNum
            decode(array[0], {extensionCodec}) as number,         // id
            decode(array[1], {extensionCodec}) as string,         // name
            decode(array[2], {extensionCodec}) as number,         // size
            decode(array[3], {extensionCodec}) as string,         // transmitter
            decode(array[5], {extensionCodec}) as Map<string,Signal>  // signals
        );
        ret.transmitters = decode(array[4], {extensionCodec}) as string[];
        ret.comment = decode(array[6], {extensionCodec}) as string;
        ret.signalGroups = decode(array[7], {extensionCodec}) as Map<string,SignalGroup>;
        ret.attributes = decode(array[8], {extensionCodec}) as Map<string,Attribute>;

        return ret;
    }
});

// signal
extensionCodec.register({
    type: 7,
    encode: (input: any): Uint8Array | null =>{
        if(input?.clsType == "signal"){
            let object = input as Signal;
            const name: Uint8Array = encode(object.name, {extensionCodec});
            const startBit: Uint8Array = encode(object.startBit, {extensionCodec});
            const bitSize: Uint8Array = encode(object.bitSize, {extensionCodec});
            const byteOrder: Uint8Array = encode(object.byteOrder, {extensionCodec});
            const valueType: Uint8Array = encode(object.valueType, {extensionCodec});
            const factor: Uint8Array = encode(object.factor, {extensionCodec});
            const offset: Uint8Array = encode(object.offset, {extensionCodec});
            const minimum: Uint8Array = encode(object.minimum, {extensionCodec});
            const maximum: Uint8Array = encode(object.maximum, {extensionCodec});
            const unit: Uint8Array = encode(object.unit, {extensionCodec});
            const receivers: Uint8Array = encode(object.receivers, {extensionCodec});
            const valTable: Uint8Array = encode(object.valTable, {extensionCodec});
            const comment: Uint8Array = encode(object.comment, {extensionCodec});
            const attributes: Uint8Array = encode(object.attributes, {extensionCodec});
            const lineNum: Uint8Array = encode(object.lineNum, {extensionCodec});
            return encode([
                name,
                startBit,
                bitSize,
                byteOrder,
                valueType,
                factor,
                offset,
                minimum,
                maximum,
                unit,
                receivers,
                valTable,
                comment,
                attributes,
                lineNum
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new Signal(
            decode(array[14], {extensionCodec}) as number,// lineNum
            decode(array[0], {extensionCodec}) as string, // name
            decode(array[1], {extensionCodec}) as number, // start
            decode(array[2], {extensionCodec}) as number, // size
            decode(array[3], {extensionCodec}) as boolean,// byte order
            decode(array[4], {extensionCodec}) as boolean,// valtype
            decode(array[5], {extensionCodec}) as number, // factor
            decode(array[6], {extensionCodec}) as number, // offset
            decode(array[7], {extensionCodec}) as number, // min
            decode(array[8], {extensionCodec}) as number, // max
            decode(array[9], {extensionCodec}) as string, // unit
            decode(array[10], {extensionCodec}) as string[] // receivers
        );
        ret.valTable = decode(array[11], {extensionCodec}) as ValTable | null;
        ret.comment = decode(array[12], {extensionCodec}) as string;
        ret.attributes = decode(array[13], {extensionCodec}) as Map<string,Attribute>;
        return ret;
    }
});

// signalType
extensionCodec.register({
    type: 8,
    encode: (input: any): Uint8Array =>{
        if(input?.clsType == "signalType"){
            let object = input as SignalType;
            const name: Uint8Array = encode(object.name, {extensionCodec});
            const size: Uint8Array = encode(object.size, {extensionCodec});
            const byteOrder: Uint8Array = encode(object.byteOrder, {extensionCodec});
            const valueType: Uint8Array = encode(object.valueType, {extensionCodec});
            const factor: Uint8Array = encode(object.factor, {extensionCodec});
            const offset: Uint8Array = encode(object.offset, {extensionCodec});
            const minimum: Uint8Array = encode(object.minimum, {extensionCodec});
            const maximum: Uint8Array = encode(object.maximum, {extensionCodec});
            const unit: Uint8Array = encode(object.unit, {extensionCodec});
            const defaultVal: Uint8Array = encode(object.default, {extensionCodec});
            const valTable: Uint8Array = encode(object.valTable, {extensionCodec});
            return encode([
                name,
                size,
                byteOrder,
                valueType,
                factor,
                offset,
                minimum,
                maximum,
                unit,
                defaultVal,
                valTable
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new SignalType(
            decode(array[0], {extensionCodec}) as string, // name
            decode(array[1], {extensionCodec}) as number, // size
            decode(array[2], {extensionCodec}) as boolean,// byte order
            decode(array[3], {extensionCodec}) as boolean,// valtype
            decode(array[4], {extensionCodec}) as number, // factor
            decode(array[5], {extensionCodec}) as number, // offset
            decode(array[6], {extensionCodec}) as number, // min
            decode(array[7], {extensionCodec}) as number, // max
            decode(array[8], {extensionCodec}) as string, // unit
            decode(array[9], {extensionCodec}) as number, // defaultVal
            decode(array[10], {extensionCodec}) as string // valTable
        );
        return ret;
    }
});

// SignalGroup
extensionCodec.register({
    type: 9,
    encode: (input: any): Uint8Array  => {
        if(input?.clsType == "signalGroup"){
            let object = input as SignalGroup;
            return encode([
                encode(object.messageId, {extensionCodec}),
                encode(object.name, {extensionCodec}),
                encode(object.repetitions, {extensionCodec}),
                encode(object.signals, {extensionCodec})
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new SignalGroup();

        ret.messageId = decode(array[0], {extensionCodec}) as number;
        ret.name = decode(array[1], {extensionCodec}) as string;
        ret.repetitions = decode(array[2], {extensionCodec}) as number;
        ret.signals = decode(array[3], {extensionCodec}) as string[];
        return ret;
    }
});

// ValTable
extensionCodec.register({
    type: 10,
    encode: (input: any): Uint8Array  =>{
        if(input?.clsType == "valTable"){
            let object = input as ValTable;
            return encode([
                encode(object.name, {extensionCodec}),
                encode(object.descriptions, {extensionCodec})
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) =>{
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new ValTable(
            decode(array[0], {extensionCodec}) as string
        );
        ret.descriptions = decode(array[1], {extensionCodec}) as Map<any,any>;
        return ret;
    }

});

// ValueType
extensionCodec.register({
    type: 11,
    encode: (input: any): Uint8Array => {
        if(input?.clsType == "valueType"){
            let object = input as ValueType;
            return encode([
                encode(object.type, {extensionCodec}),
                encode(object.min, {extensionCodec}),
                encode(object.max, {extensionCodec}),
                encode(object.enumVals, {extensionCodec})
            ]);
        }else
            return null
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new ValueType(decode(array[0], {extensionCodec}) as number);
        ret.min = decode(array[1], {extensionCodec}) as number;
        ret.max = decode(array[2], {extensionCodec}) as number;
        ret.enumVals = decode(array[3], {extensionCodec}) as string[];
        return ret;
    }
});

// Database
extensionCodec.register({
    type: 1,
    encode: (input: any): Uint8Array  => {
        if (input?.type == "database"){
            let object = input as Database;
            var msgs: Uint8Array = encode(object.messages, {extensionCodec});
            var valTables: Uint8Array = encode(object.valTables, {extensionCodec});
            var nodes: Uint8Array = encode(object.nodes, {extensionCodec});
            var environmentVariables: Uint8Array = encode(object.environmentVariables, {extensionCodec});
            var signalTypes: Uint8Array = encode(object.signalTypes, {extensionCodec});
            var attrDefs: Uint8Array = encode(object.attrDefs, {extensionCodec});
            var attrs: Uint8Array = encode(object.attributes, {extensionCodec});
            var version: Uint8Array = encode(object.version, {extensionCodec});
            var comment: Uint8Array = encode(object.comment, {extensionCodec});
            var filename: Uint8Array = encode(object.fileName, {extensionCodec});
            return encode([version, filename, comment, msgs, valTables, nodes, environmentVariables, signalTypes, attrDefs, attrs], {extensionCodec});
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<Uint8Array>;
        var ret = new Database();
        ret.version = decode(array[0], {extensionCodec}) as string;
        ret.fileName = decode(array[1], {extensionCodec}) as string;
        ret.comment = decode(array[2], {extensionCodec}) as string;
        ret.messages = decode(array[3], {extensionCodec}) as Map<number, Message>;
        ret.valTables = decode(array[4], {extensionCodec}) as Map<string,ValTable>;
        ret.nodes = decode(array[5], {extensionCodec}) as Map<string,Node>;
        ret.environmentVariables = decode(array[6], {extensionCodec}) as Map<string,EnvironmentVariable>;
        ret.signalTypes = decode(array[7], {extensionCodec}) as Map<string,SignalType>;
        ret.attrDefs = decode(array[8], {extensionCodec}) as Map<string,AttributeDef>;
        ret.attributes = decode(array[9], {extensionCodec}) as Map<string,Attribute>;
        return ret;
    }
});

extensionCodec.register({
    type: 0,
    encode: (object: unknown): Uint8Array => {
        // 1. <for each key,value in the map
        // 2. encode the key and value
        // 3. put the key and value in a tmp array
        // 4. encode the tmp array
        // 5. push tmp into ret
        // 6. <go back to step 1>
        // 7. encode the ret array
        // 8. return ret
        if (object instanceof Map) {
            let ret: Array<Uint8Array> = [];
            object.forEach((value, key) => {
                let tmp: Array<Uint8Array> = [];
                tmp.push(encode(key, {extensionCodec}));
                tmp.push(encode(value, {extensionCodec}));
                ret.push(encode(tmp, {extensionCodec}));
            });
            return encode(ret, {extensionCodec});
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        let decdBigArray: Array<Uint8Array> = decode(data, {extensionCodec}) as Array<Uint8Array>;
        let ret: Map<unknown, unknown> = new Map();
        decdBigArray.forEach((value) => {
            let tmp: Array<Uint8Array> = decode(value, {extensionCodec}) as Array<Uint8Array>;
            ret.set(decode(tmp[0], {extensionCodec}), decode(tmp[1], {extensionCodec}));
        });
        return ret;
    },
});


export function encodeDb(db: Database): string{
    db.parseErrors = [];
    var encoded: Uint8Array = encode(db, {extensionCodec});
    if(encoded.byteLength*8/6 > 0x1fffffe7){
        // cannot create string longer than 512Mb
        console.error("String too large!")
        return "OVERLOADED STRING";
    }
    var encoded64 = b64.Base64.fromUint8Array(encoded);
    return encoded64;
}

export function decodeDb(data: string): Database{
    if(data == "OVERLOADED STRING"){
        let ret = new Database();
        ret.version = "Too large for parsing.";
        return ret;
    }
    var u8array = b64.Base64.toUint8Array(data);
    var decoded = decode(u8array, {extensionCodec}) as Database;
    return decoded;
}

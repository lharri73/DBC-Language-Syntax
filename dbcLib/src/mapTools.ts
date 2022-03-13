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
export const extensionCodec = new ExtensionCodec();

extensionCodec.register({
    type: 0,
    encode: (object: unknown): Uint8Array => {
      if (object instanceof Map) {
        return encode([...object]);
      } else {
        return null;
      }
    },
    decode: (data: Uint8Array) => {
      const array = decode(data) as Array<[unknown, unknown]>;
      return new Map(array);
    },
  });

// Database
extensionCodec.register({
    type: 1,
    encode: (object: unknown): Uint8Array | null => {
        if (object instanceof Database){
            var msgs: Uint8Array = encode(object.messages);
            var valTables: Uint8Array = encode(object.valTables);
            var nodes: Uint8Array = encode(object.nodes);
            var environmentVariables: Uint8Array = encode(object.environmentVariables);
            var signalTypes: Uint8Array = encode(object.signalTypes);
            var attrDefs: Uint8Array = encode(object.attrDefs);
            var attrs: Uint8Array = encode(object.attributes);
            var version: Uint8Array = encode(object.version);
            var comment: Uint8Array = encode(object.comment);
            var filename: Uint8Array = encode(object.fileName);
            return encode([version, filename, comment, msgs, valTables, nodes, environmentVariables, signalTypes, attrDefs, attrs]);
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new Database();
        ret.version = decode(array[0]) as string;
        ret.fileName = decode(array[1]) as string;
        ret.comment = decode(array[2]) as string;
        ret.messages = decode(array[3]) as Map<number, Message>;
        ret.valTables = decode(array[4]) as Map<string,ValTable>;
        ret.nodes = decode(array[5]) as Map<string,Node>;
        ret.environmentVariables = decode(array[6]) as Map<string,EnvironmentVariable>;
        ret.signalTypes = decode(array[7]) as Map<string,SignalType>;
        ret.attrDefs = decode(array[8]) as Map<string,AttributeDef>;
        ret.attributes = decode(array[9]) as Map<string,Attribute>;
        return ret;
    }
});

// Attribute
extensionCodec.register({
    type: 2,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof Attribute){
            var name: Uint8Array = encode(object.name);
            var type: Uint8Array = encode(object.type);
            var value: Uint8Array = encode(object.value);
            return encode([name, type, value]);
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        return new Attribute(
            decode(array[0]) as string,
            decode(array[1]) as number,
            decode(array[2]));
    }
});

// AttributeDef
extensionCodec.register({
    type: 3,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof AttributeDef){
            var name: Uint8Array = encode(object.name);
            var type: Uint8Array = encode(object.objType);
            var value: Uint8Array = encode(object.valType);
            return encode([name, type, value]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        return new AttributeDef(
            decode(array[0]) as string,
            decode(array[1]) as number,
            decode(array[2]) as ValueType
        );
    }
});

// Node
extensionCodec.register({
    type: 4,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof Node){
            var name: Uint8Array = encode(object.name);
            var comment: Uint8Array = encode(object.comment);
            var attributes: Uint8Array = encode(object.attributes);
            return encode([name, comment, attributes]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new Node(decode(array[0]) as string);
        ret.comment = decode(array[1]) as string;
        ret.attributes = decode(array[2]) as Map<string,Attribute>;
        return ret;
    }
})

extensionCodec.register({
    type: 5,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof EnvironmentVariable){
            var name: Uint8Array = encode(object.name);
            var type: Uint8Array = encode(object.type);
            var min: Uint8Array = encode(object.min);
            var max: Uint8Array = encode(object.max);
            var unit: Uint8Array = encode(object.unit);
            var initialVal: Uint8Array = encode(object.initialVal);
            var id: Uint8Array = encode(object.id);
            var transmitters: Uint8Array = encode(object.transmitters)
            var valueDescriptions: Uint8Array = encode(object.valueDescriptions);
            var dataSize: Uint8Array = encode(object.dataSize);
            var comment: Uint8Array = encode(object.comment);
            var attributes: Uint8Array = encode(object.attributes);
            return(encode([name, type, min, max, unit, initialVal, id, transmitters, valueDescriptions, dataSize, comment, attributes]));
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new EnvironmentVariable();
        ret.name = decode(array[0]) as string;
        ret.type = decode(array[1]) as number;
        ret.min = decode(array[2]) as number;
        ret.max = decode(array[3]) as number;
        ret.unit = decode(array[4]) as string;
        ret.initialVal = decode(array[5]) as number;
        ret.id = decode(array[6]) as number;
        ret.transmitters = decode(array[7]) as string[];
        ret.dataSize = decode(array[8]) as number;
        ret.comment = decode(array[9]) as string;
        ret.attributes = decode(array[10]) as Map<string,Attribute>;
        return ret;
    }
});

// message
extensionCodec.register({
    type: 6,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof Message){
            const id: Uint8Array = encode(object.id);
            const name: Uint8Array = encode(object.name);
            const size: Uint8Array = encode(object.size);
            const transmitter: Uint8Array = encode(object.transmitter);
            const transmitters: Uint8Array = encode(object.transmitters);
            const signals: Uint8Array = encode(object.signals);
            const comment: Uint8Array = encode(object.comment);
            const signalGroups: Uint8Array = encode(object.signalGroups);
            const attributes: Uint8Array = encode(object.attributes);
            return encode([id, name, size, transmitter, transmitters, signals, comment, signalGroups, attributes]);
        }else
            return null
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new Message(
            0, // endLineNum
            decode(array[0]) as number,
            decode(array[1]) as string,
            decode(array[2]) as number,
            decode(array[3]) as string,
            decode(array[5]) as Map<string,Signal>
        );
        ret.transmitters = decode(array[4]) as string[];
        ret.comment = decode(array[6]) as string;
        ret.signalGroups = decode(array[7]) as Map<string,SignalGroup>;
        ret.attributes = decode(array[8]) as Map<string,Attribute>;
        return ret;
    }
});

// signal
extensionCodec.register({
    type: 7,
    encode: (object: unknown): Uint8Array | null =>{
        if(object instanceof Signal){
            const name: Uint8Array = encode(object.name);
            const startBit: Uint8Array = encode(object.startBit);
            const bitSize: Uint8Array = encode(object.bitSize);
            const byteOrder: Uint8Array = encode(object.byteOrder);
            const valueType: Uint8Array = encode(object.valueType);
            const factor: Uint8Array = encode(object.factor);
            const offset: Uint8Array = encode(object.offset);
            const minimum: Uint8Array = encode(object.minimum);
            const maximum: Uint8Array = encode(object.maximum);
            const unit: Uint8Array = encode(object.unit);
            const receivers: Uint8Array = encode(object.receivers);
            const valTable: Uint8Array = encode(object.valTable);
            const comment: Uint8Array = encode(object.comment);
            const attributes: Uint8Array = encode(object.attributes);
            const lineNum: Uint8Array = encode(object.lineNum);
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
        const array = decode(data) as Array<Uint8Array>;
        var ret = new Signal(
            decode(array[14]) as number,// lineNum
            decode(array[0]) as string, // name
            decode(array[1]) as number, // start
            decode(array[2]) as number, // size
            decode(array[3]) as boolean,// byte order
            decode(array[4]) as boolean,// valtype
            decode(array[5]) as number, // factor
            decode(array[6]) as number, // offset
            decode(array[7]) as number, // min
            decode(array[8]) as number, // max
            decode(array[9]) as string, // unit
            decode(array[10]) as string[] // receivers
        );
        ret.valTable = decode(array[11]) as ValTable | null;
        ret.comment = decode(array[12]) as string;
        ret.attributes = decode(array[13]) as Map<string,Attribute>;
        return ret;
    }
});

// signalType
extensionCodec.register({
    type: 8,
    encode: (object: unknown): Uint8Array | null =>{
        if(object instanceof SignalType){
            const name: Uint8Array = encode(object.name);
            const size: Uint8Array = encode(object.size);
            const byteOrder: Uint8Array = encode(object.byteOrder);
            const valueType: Uint8Array = encode(object.valueType);
            const factor: Uint8Array = encode(object.factor);
            const offset: Uint8Array = encode(object.offset);
            const minimum: Uint8Array = encode(object.minimum);
            const maximum: Uint8Array = encode(object.maximum);
            const unit: Uint8Array = encode(object.unit);
            const defaultVal: Uint8Array = encode(object.default);
            const valTable: Uint8Array = encode(object.valTable);
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
        const array = decode(data) as Array<Uint8Array>;
        var ret = new SignalType(
            decode(array[0]) as string, // name
            decode(array[1]) as number, // size
            decode(array[2]) as boolean,// byte order
            decode(array[3]) as boolean,// valtype
            decode(array[4]) as number, // factor
            decode(array[5]) as number, // offset
            decode(array[6]) as number, // min
            decode(array[7]) as number, // max
            decode(array[8]) as string, // unit
            decode(array[9]) as number, // defaultVal
            decode(array[10]) as string // valTable
        );
        return ret;
    }
});

// SignalGroup
extensionCodec.register({
    type: 9,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof SignalGroup){
            return encode([
                encode(object.messageId),
                encode(object.name),
                encode(object.repetitions),
                encode(object.signals)
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new SignalGroup();

        ret.messageId = decode(array[0]) as number;
        ret.name = decode(array[1]) as string;
        ret.repetitions = decode(array[2]) as number;
        ret.signals = decode(array[3]) as string[];
        return ret;
    }
});

// ValTable
extensionCodec.register({
    type: 10,
    encode: (object: unknown): Uint8Array | null =>{
        if(object instanceof ValTable){
            return encode([
                encode(object.name),
                encode(object.descriptions)
            ]);
        }else
            return null;
    },
    decode: (data: Uint8Array) =>{
        const array = decode(data) as Array<Uint8Array>;
        var ret = new ValTable(
            decode(array[0]) as string
        );
        ret.descriptions = decode(array[1]) as Map<any,any>;
        return ret;
    }

});

// ValueType
extensionCodec.register({
    type: 11,
    encode: (object: unknown): Uint8Array | null => {
        if(object instanceof ValueType){
            return encode([
                encode(object.type),
                encode(object.min),
                encode(object.max),
                encode(object.enumVals)
            ]);
        }else
            return null
    },
    decode: (data: Uint8Array) => {
        const array = decode(data) as Array<Uint8Array>;
        var ret = new ValueType(decode(array[0]) as number);
        ret.min = decode(array[1]) as number;
        ret.max = decode(array[2]) as number;
        ret.enumVals = decode(array[3]) as string[];
        return ret;
    }
});


export function encodeDb(db: Database): string{
    db.parseErrors = [];
    var encoded: Uint8Array = encode(db, {extensionCodec});
    console.log(JSON.stringify(db));
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

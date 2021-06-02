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
import { SignalType } from "./dbc/signal";

export function replacer(key: any, value: any) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else if (value instanceof Database){
        value.toString();
        var dbret = "";
        dbret += '[';
        dbret += value.messagesStr + ",";
        dbret += value.valTablesStr + ",";
        dbret += value.nodesStr + ",";
        dbret += value.environmentVariablesStr + ",";
        dbret += value.signalTypesStr + ",";
        dbret += value.attrDefsStr + ",";
        dbret += value.attributesStr + ",";
        dbret += value.version + ",";
        dbret += value.comment + ",";
        dbret += value.fileName + "]";
        return {
            dataType: 'Database',
            value: dbret,
        };
    } else if (value instanceof Message) {
        value.toString();
        var ret = new Array();
        ret.push(value.id);
        ret.push(value.name);
        ret.push(value.size);
        ret.push(value.transmitter);
        ret.push(value.transmitterStr);
        ret.push(value.signalStr);
        ret.push(value.comment);
        ret.push(value.sigGroupStr);
        ret.push(value.attributeStr);
        return {
            dataType: 'Message',
            value: ret,
        };
    }else {
        return value;
    }
}

export function reviver(key: any, value: any) {
    if(value !== null) {
        if (value.dataType === 'Map') {
            var map = new Map(value.value);
            return new Map(value.value);
        }else if (value.dataType === 'Database'){
            var db = new Database();
            db.fromString(value.value);
            return db;
        }else if (value.dataType === 'Message'){
            var msg = new Message(0,0,"",0,"",new Map());
            msg.fromString(value.value);
            return msg;

        }
    }
    return value;
}


// DBCError elided
const extensionCodec = new ExtensionCodec();
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
        }else
            return null;
    },
    decode: (data: Uint8Array) => {

    }
})

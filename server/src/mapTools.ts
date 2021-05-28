import { Database } from "./dbc/db";
import { Message } from "./dbc/message";

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

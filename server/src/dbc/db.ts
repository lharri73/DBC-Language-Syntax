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

import { DBCError } from "../errors";
import { replacer, reviver } from "../mapTools";
import { AttributeDef, Attribute } from "./attributes";
import { EnvironmentVariable } from "./ev";
import { Message } from "./message"
import { Node } from "./node";
import { SignalType } from "./signal";
import { ValTable } from "./valtable";
import { encode, decode } from 'js-base64';

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
        this.attrDefs = new Map();
        this.attributes = new Map();

        this.messagesStr = "";
        this.attrDefsStr = "";
        this.valTablesStr = "";
        this.nodesStr = "";
        this.environmentVariablesStr = "";
        this.signalTypesStr = "";
        this.attrDefsStr = "";
        this.attributesStr ="";
    }

    public fromString(json: string[]){
        this.version = json[7];
        this.comment = json[8];
        // this.symbols = json?.symbols;
        // this.bitTiming = json?.bitTiming;
        // this.parseErrors = json?.parseErrors;

        this.messages = JSON.parse(decode(json[0]), reviver);
        // this.valTables = JSON.parse(decode(json.valTablesStr), reviver);
        // this.nodes = JSON.parse(decode(json.nodesStr), reviver);
        // this.environmentVariables = JSON.parse(decode(json.environmentVariablesStr), reviver);
        // this.signalTypes = JSON.parse(decode(json.signalTypesStr), reviver);
        // this.attrDefs = JSON.parse(decode(json.attrDefsStr), reviver);
        // this.attributes = JSON.parse(decode(json.attributesStr), reviver);
        
    }

    public toString(){
        this.messagesStr = encode(JSON.stringify(this.messages, replacer));
        this.valTablesStr = encode(JSON.stringify(this.valTables, replacer));
        this.nodesStr = encode(JSON.stringify(this.nodes, replacer));
        this.environmentVariablesStr = encode(JSON.stringify(this.environmentVariables, replacer));
        this.signalTypesStr = encode(JSON.stringify(this.signalTypes, replacer));
        this.attrDefsStr = encode(JSON.stringify(this.attrDefs, replacer));
        this.attributesStr = encode(JSON.stringify(this.attributes, replacer));
    }

    public messagesStr: string;
    public valTablesStr: string;
    public nodesStr: string;
    public environmentVariablesStr: string;
    public signalTypesStr: string;
    public attrDefsStr: string;
    public attributesStr: string;

    public messages: Map<number, Message>;
    public version: string;
    public symbols: string[];
    public parseErrors: DBCError[];
    public bitTiming: BitTiming;
    public valTables: Map<string,ValTable>;
    public nodes: Map<string,Node>;
    public environmentVariables: Map<string,EnvironmentVariable>;
    public signalTypes: Map<string,SignalType>;
    public comment: string;
    public attrDefs: Map<string,AttributeDef>;
    public attributes: Map<string,Attribute>;
}


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

import { DBCError } from "./errors";
import { AttributeDef, Attribute } from "./attributes";
import { EnvironmentVariable } from "./ev";
import { Message } from "./message"
import { Node } from "./dbcNode";
import { SignalType } from "./signal";
import { ValTable } from "./valtable";

export interface BitTiming{
    baudRate: number,
    register_1: number,
    register_2: number
};

export class Database{
    public static readonly identifier="Database";
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
        this.fileName = "";
        this.type = "database";
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

    public fileName: string;
    public type: string;
}

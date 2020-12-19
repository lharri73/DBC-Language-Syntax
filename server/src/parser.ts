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


import Database from './db';

import { Parser } from 'jison';
var Lexer = require('jison-lex');   // this is probably bad

import { fstat, readFileSync } from 'fs';
import { resolve } from 'path';

export class DBCParser {
    private database: Database;
    private parser;
    public constructor(){
        this.database = {
            messages: []
        }
        var tokens = readFileSync(resolve(__dirname,"..","dbc.jison"), "utf8");
        var lexicon = readFileSync(resolve(__dirname,"..","dbc.lex"), "utf8");
        this.parser = Parser(tokens);
        this.parser.lexer = new Lexer(lexicon);
    }

    public parse(contents: string){
        var parseResult = this.parser.parse(contents);
        console.log(parseResult);
    }
}

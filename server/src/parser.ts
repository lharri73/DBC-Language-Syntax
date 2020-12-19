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


import {
    Signal, 
    Message, 
    Database
} from './db';

// import {Parser} from 'jison';

import { readFileSync } from 'fs';

export class DBCParser {
    private database: Database;
    // private parser: Parser;
    public constructor(){
        this.database = {
            messages: []
        }
        var tokens = readFileSync("../dbc.jison", "utf8");
        // this.parser = Parser(tokens);
    }

    public parse(contents: string){
        console.log(contents);
    }
}

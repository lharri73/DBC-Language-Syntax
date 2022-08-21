import {readFileSync} from 'fs';
import {Database} from './db';
import { Parser, Generator } from 'jison';
var Lexer = require('jison-lex');   // this is probably bad
import { resolve } from 'path';

function load(filename: string){
    let contents: string = readFileSync(filename, {encoding: 'utf-8'});
    parse(contents);
}

function parse(contents: string){
    // for()
}

load("/Users/landon/Code/dbcs/test.dbc")

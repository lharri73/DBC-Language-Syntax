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


import { Parser } from 'jison';
var Lexer = require('jison-lex');   // this is probably bad

import { fstat, readFileSync } from 'fs';
import { resolve } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { Connection, Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DBCParseError } from './db';

export class DBCParser {
    // private database: Database;
    private tokens: string;
    private lexicon: string;
    private connection: Connection;
    private lexer;
    public constructor(connection: Connection){
        this.tokens = readFileSync(resolve(__dirname,"..","dbc.jison"), "utf8");
        this.lexicon = readFileSync(resolve(__dirname,"..","dbc.lex"), "utf8");
        this.lexer = new Lexer(this.lexicon);
        this.connection = connection;
    }
    
    public async parse(contents: string, uri: string){
        /* create a new parser to clear the context within
        *  the parser itself. */
        var parser = new Parser(this.tokens);
        parser.lexer = this.lexer;

        try {
            var parseResult = parser.parse(contents);
            
            if(parseResult.parseErrors.length != 0){
                this.sendCustomParseError(uri, parseResult.parseErrors);
            }else{
                this.clearDiag(uri);
            }
            // if no error
            console.log(parseResult);

        } catch (e) {
            console.log(e);
            try{
                this.sendDiag(e, uri);
            }catch(_){
                this.sendBadLine(e, uri);
            }finally{
                // debug value 
                console.log("Error: ", JSON.stringify(e));
            }
        }
    }

    // send errors to vscode
    private sendDiag(e: any, uri: string){ /* e: Parser.parseError */
        var len = e.hash.text;

        var lastPart = JSON.stringify(e.hash.expected);
        var found = e.hash.token;
        let diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Error,
            range: {
                start: {
                    line: e.hash.loc.first_line,
                    character: e.hash.loc.first_column
                },
                end: {
                    line: e.hash.loc.last_line,
                    character: e.hash.loc.last_column + len.length
                }
            },
            message: `Found ${found}.\nExpected ${lastPart}.`
        };

        let diagnostics = [];
        diagnostics.push(diagnostic);

        this.connection.sendDiagnostics({uri: uri, diagnostics});
    }

    private sendBadLine(e: any, uri: string){
        if(e.hash == undefined){
            // this is bad
            return;
        }
        let diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Error,
            range: {
                start: {
                    line: e.hash.line,
                    character: 0
                },
                end: {
                    line: e.hash.line,
                    character: Number.MAX_VALUE
                }
            },
            message: "Unexpected token."
        }

        let diagnostics = [];
        diagnostics.push(diagnostic);

        this.connection.sendDiagnostics({uri: uri, diagnostics});
    }

    private async sendCustomParseError(uri: string, parseErrors: DBCParseError[]){
        let diagnostics: Diagnostic[] = [];
        parseErrors.forEach(curError => {
            let diagnostic: Diagnostic = {
                severity: DiagnosticSeverity.Warning,
                range: {
                    start: { 
                        line: curError.line,
                        character: 0
                    },
                    end: {
                        line: curError.line,
                        character: Number.MAX_VALUE
                    }
                },
                message: curError.what
            }
            diagnostics.push(diagnostic);
        });

        this.connection.sendDiagnostics({uri: uri, diagnostics: diagnostics});
    }

    // remove all diagnostics from vscode
    private clearDiag(uri: string){
        let diagnostics: Diagnostic[] = [];

        this.connection.sendDiagnostics({uri: uri, diagnostics});
    }
}

/*
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

%{

const path = require("path");
const {Database, Message, Signal, DBCParseError} = require(path.join(__dirname, "../../../out/db.js"));
var db = new Database();

%}

%token VERSION
%token BO 
%token COLON 
%token QUOTE
%token VECTOR_XXX
%token UNSAFE_WORD
%token REG_WORD
%token DECIMAL
%token DBC_WORD
%token ENDOFFILE
%token NS

%%

/* Structure of the file itself */
network
    : version
      new_symbols
    //   bit_timing
    //   nodes
      error
      messages
      error
      end;

end
    : ENDOFFILE { return db};

version
    : VERSION quoted_string EOL{
        db.version = $quoted_string;
    }
    | error{
        db.parseErrors.push(new DBCParseError(yylineno, "DBC file should start with\n VERSION \"\""));
    };

new_symbols
    : %empty 
    | NS COLON EOL ns_values{
        db.symbols = $ns_values;
    };

ns_values
    : %empty {$$ = [];}; /* base case */
    /* TODO: add specific values to error check rather than string */
    | string EOL ns_values {
        $$ = $ns_values;
        if($$ == undefined){
            $$ = [$string];
        }else{
            $$.push($string);
        }
    };

messages
    : %empty
    | messages message{
        db.messages[$message.id] = $message;
    };

message
    : BO id DBC_WORD COLON DECIMAL transmitter EOL {
        $$ = new Message($id, $DBC_WORD, $DECIMAL, $transmitter);
    };

id
    : DECIMAL {$$ = $1};

transmitter
    : VECTOR_XXX { $$ = ""; }   /* this is a default transmitter, ignore it */
    | DBC_WORD { $$ = $1; };

/* More primative types */
string
    : UNSAFE_WORD {$$ = $UNSAFE_WORD;};
    // | REG_WORD {$$ = $REG_WORD;};

quoted_string
    : QUOTE UNSAFE_WORD QUOTE {$$ = $2;}
    | QUOTE QUOTE {$$ = ""; };

number
    : DECIMAL { $$ = $1 } 
    | DECIMAL_EXP { $$ = $1 }
    | DECIMAL_POINT { $$ = $1}
    ;
%%


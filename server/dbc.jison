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
const {
    Database, 
    Message, 
    Node,
    Signal, 
    DBCParseError,
    ValTable
} = require(path.join(__dirname, "../../../out/db.js"));
var db = new Database();

%}

%token VERSION
%token BO 
%token NS
%token COLON 
%token QUOTE
%token VECTOR_XXX
%token UNSAFE_WORD
// %token REG_WORD
%token DECIMAL
// %token DBC_WORD
%token ENDOFFILE

%%

/* Structure of the file itself */
network
    : version
      new_symbols
      bit_timing
      nodes
      val_tables
      messages
      end;

end
    : ENDOFFILE { return db};

version
    : VERSION quoted_string EOL{
        db.version = $quoted_string;
    };

//----------------------
// NS_ section
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

//----------------------
// BS_ section
bit_timing
    : BS COLON EOL
    | BS COLON DECIMAL COLON DECIMAL COMMA DECIMAL EOL {
        db.bitTiming.baudRate   = parseInt($3);
        db.bitTiming.register_1 = parseInt($5);
        db.bitTiming.register_2 = parseInt($7);
    };

//----------------------
// BU_ section
nodes
    : BU COLON node_names EOL;

node_names
    : %empty
    | node_names node_name {
        db.nodes[$node_name] = new Node($node_name);
    };

node_name
    : UNSAFE_WORD { $$ = $1;};

//----------------------
// VAL_TABLE_ section
val_tables
    : %empty
    | val_tables val_table{
        db.valTables[$val_table.name] = $val_table;
        console.log($val_table);
    };

val_table
    : VAL_TABLE UNSAFE_WORD val_table_descriptions SEMICOLON EOL{
        $$ = new ValTable($UNSAFE_WORD);
        $$.descriptions = $val_table_descriptions;
    };

val_table_descriptions
    :  {$$ = new Map();}
    | val_table_descriptions val_table_descr{
        $$ = $val_table_descriptions;
        $$[$val_table_descr[0]] = $val_table_descr[1];
    };

val_table_descr
    : DECIMAL quoted_string{
        $$ = [];
        $$.push(Number($DECIMAL));
        $$.push($quoted_string);
    };

//----------------------
// BO_ section
messages
    : %empty
    | messages message{
        db.messages[$message.id] = $message;
    };

message
    : BO id UNSAFE_WORD COLON DECIMAL transmitter EOL {
        $$ = new Message($id, $UNSAFE_WORD, parseInt($DECIMAL), $transmitter);
    };

id
    : DECIMAL {$$ = parseInt($1);};

transmitter
    : VECTOR_XXX { $$ = ""; }   /* this is a default transmitter, ignore it */
    | UNSAFE_WORD { $$ = $1; };

//----------------------
/* More primative types */
string
    : UNSAFE_WORD {$$ = $UNSAFE_WORD;};
    // | REG_WORD {$$ = $REG_WORD;};

quoted_string
    : QUOTE UNSAFE_WORD QUOTE {$$ = $2;}
    | QUOTE QUOTE {$$ = ""; };

number
    : DECIMAL { $$ = parseInt($1); } 
    | DECIMAL_EXP { $$ = Number($1); }
    | DECIMAL_POINT { $$ = parseFloat($1); }
    ;
%%


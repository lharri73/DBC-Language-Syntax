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
%token BS
%token BU
%token VAL_TABLE
%token SG
%token AT
%token VBAR
%token COLON 
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
      msg_transmitters
      val_descriptions
      end;

end
    : ENDOFFILE { return db};

version
    : VERSION QUOTED_STRING EOL{
        db.version = $QUOTED_STRING;
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
    : DECIMAL QUOTED_STRING{
        $$ = [];
        $$.push(Number($DECIMAL));
        $$.push($QUOTED_STRING);
    };

//----------------------
// BO_ section
messages
    : %empty
    | messages message{
        db.messages[$message.id] = $message;
    };

message
    : BO id UNSAFE_WORD COLON DECIMAL transmitter EOL signals {
        $$ = new Message($id, 
                         $UNSAFE_WORD, 
                         parseInt($DECIMAL), 
                         $transmitter, 
                         $signals
                        );
    };

id
    : DECIMAL {$$ = parseInt($1);};

transmitter
    : VECTOR_XXX { $$ = ""; }   /* this is a default transmitter, ignore it */
    | UNSAFE_WORD { $$ = $1; };

//----------------------
//SG_ section
signals
    : { $$ = new Map(); }
    | signals signal {
        $$ = $1;
        $$[$2.name] = $2;
    };
signal
    : SG UNSAFE_WORD /*multiplexer*/ COLON DECIMAL VBAR DECIMAL AT 
      byte_order val_type OPEN_PAREN number COMMA number CLOSE_PAREN
      OPEN_BRACK number VBAR number CLOSE_BRACK QUOTED_STRING receivers EOL{
          $$ = new Signal(/*name:  */$2, 
                          /*start: */Number($4), 
                          /*size:  */Number($6),
                          /*order: */$8,
                          /*type:  */$9,
                          /*factor:*/$11,
                          /*offset:*/$13,
                          /*min:   */$16,
                          /*max:   */$18,
                          /*unit:  */$20,
                          /*recs:  */$21);
      };

byte_order
    : DECIMAL {
        if( $1 == 0 ){
            $$ = false;
        }else if( $1 == 1){
            $$ = true;
        }else{
            db.parseErrors.push(new ParseError(yylineno, "byte order should be '0' or '1'\n Found " + $1))
            $$ = true;
        }
    };

val_type
    : PLUS { $$ = false } /* unsigned */
    | MINUS { $$ = true }; /* signed */

receivers
    : receiver {
        $$ = [];
        if($1 != ""){
            $$.push($1);
        };
    }
    | receivers COMMA receiver { 
        $$ = $1;
        if($3 != ""){
            $$.push($3);
        };
    };

receiver
    : UNSAFE_WORD { $$ = $1; }
    | VECTOR_XXX { $$ = ""; };

//----------------------
// BO_TX_BU section

msg_transmitters
    : %empty
    | msg_transmitters msg_transmitter;

msg_transmitter
    : BO_TX_BU id COLON transmitters SEMICOLON EOL {
        db.messages[$id].transmitters = $transmitters;
    };

transmitters
    : transmitter {
        $$ = [];
        $$.push($1);
    }
    | transmitters COMMA transmitter {
        $$ = $1;
        $$.push($3);
    };

//----------------------
// VAL_ section
val_descriptions
    : %empty
    | val_descriptions val_descr_for_sig
    | val_descriptions val_descr_for_env;

val_descr_for_sig
    : VAL id UNSAFE_WORD val_table_descriptions SEMICOLON EOL {
        db.messages[$id].signals[$UNSAFE_WORD].valTable = $val_table_descriptions;
    };

//----------------------
/* More primative types */
string
    : UNSAFE_WORD {$$ = $UNSAFE_WORD;};
    // | REG_WORD {$$ = $REG_WORD;};

number
    : DECIMAL { $$ = parseInt($1); } 
    | DECIMAL_EXP { $$ = Number($1); }
    | DECIMAL_POINT { $$ = parseFloat($1); }
    | MINUS DECIMAL { $$ = -1 * parseInt($2); }
    | MINUS DECIMAL_EXP { $$ = -1 * Number($2); }
    | MINUS DECIMAL_POINT {$$ = -1 * parseFloat($2); }
    ;
%%


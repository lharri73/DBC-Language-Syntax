/*
 * Copyright (C) 2022 Landon Harris
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
const dbclib = require(path.resolve(path.join(__dirname, '../../dbcLib/build/serverPack.js')));
// const { Database }                          = require(path.join(dbcSrcDir, "db.js"));
// const { Attribute, AttributeDef }           = require(path.join(dbcSrcDir, "attributes.js"));
// const { EnvironmentVariable }               = require(path.join(dbcSrcDir, "ev.js"));
// const { Message }                           = require(path.join(dbcSrcDir, "message.js"));
// const { Node }                              = require(path.join(dbcSrcDir, "node.js"));
// const { Signal, SignalGroup, SignalType }   = require(path.join(dbcSrcDir, "signal.js"));
// const { ValTable, ValueType }               = require(path.join(dbcSrcDir, "valtable.js"));
// const { DBCError }                          = require(path.join(dbcSrcDir,
// "../errors.js"));
// const Database = require('db')
const db = new dbclib.Database();

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
%token MULTIPLEXOR
%token MULTIPLEXED

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
      env_vars
      env_var_datas
      signal_types
      comments
      attribute_deffinitions
      attribute_defaults
      attribute_valssss
      val_descriptions
      signal_groups

      error
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
    | symbols_list EOL ns_values {
        $$ = $ns_values;
        if($$ == undefined){
            $$ = [$symbols_list];
        }else{
            $$.push($symbols_list);
        }
    };

symbols_list
    : NS
    | BA
    | BA_DEF
    | BA_DEF_DEF
    | BA_DEF_DEF_REL
    | BA_DEF_REL
    | BA_REL
    | BO
    | BO_TX_BU
    | BU
    | BU_SG_REL
    | CM
    | ENVVAR_DATA
    | EV
    | SG
    | SGTYPE
    | SIG_GROUP
    | VAL
    | VAL_TABLE
    | UNSAFE_WORD;

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
        db.nodes.set($node_name, new dbclib.Node($node_name));
    };

node_name
    : UNSAFE_WORD { $$ = String($1);};

//----------------------
// VAL_TABLE_ section
val_tables
    : %empty
    | val_tables val_table{
        db.valTables.set($val_table.name, $val_table);
    };

val_table
    : VAL_TABLE UNSAFE_WORD val_table_descriptions SEMICOLON EOL{
        $$ = new dbclib.ValTable($UNSAFE_WORD);
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
        db.messages.set($message.id, $message);
    };

message
    : BO id UNSAFE_WORD COLON DECIMAL transmitter EOL signals {
        $$ = new dbclib.Message(yylineno,
                         $id, 
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
        $$.set($2.name, $2);
    };
signal
    : SG UNSAFE_WORD multiplex_indicator COLON DECIMAL VBAR DECIMAL AT 
      byte_order signal_val_type OPEN_PAREN number COMMA number CLOSE_PAREN
      OPEN_BRACK number VBAR number CLOSE_BRACK QUOTED_STRING receivers EOL {
          $$ = new dbclib.Signal(yylineno,
                          /*name:           */$2, 
                          /*start:          */Number($5), 
                          /*size:           */Number($7),
                          /*order:          */$9,
                          /*type:           */$10,
                          /*factor:         */$12,
                          /*offset:         */$14,
                          /*min:            */$17,
                          /*max:            */$19,
                          /*unit:           */$21,
                          /*recs:           */$22,
                          /*multiplexInd:   */$3);
      };

multiplex_indicator
    : %empty {$$ = null;}
    | multiplex_token {$$ = $1;};

multiplex_token
    : MULTIPLEXOR {$$ = 'M';}
    | MULTIPLEXED {$$ = $1;};

byte_order
    : DECIMAL {
        if( $1 == 0 ){
            $$ = false;
        }else if( $1 == 1){
            $$ = true;
        }else{
            db.parseErrors.push(new dbclib.DBCError(yylineno, "Byte order should be '0' or '1'\n Found " + $1, 1));
            $$ = true;
        }
    };

signal_val_type
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
        // TODO: raise error if not exist
        // db.messages.get($id).transmitters = $transmitters;
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
// EV_ section
env_vars
    : %empty
    | env_vars env_var;

env_var
    : EV UNSAFE_WORD COLON env_var_type OPEN_BRACK number VBAR number 
      CLOSE_BRACK QUOTED_STRING number id access_type transmitters SEMICOLON EOL{
          var cur;
          if(db.environmentVariables.has($2)){
              cur = db.environmentVariables.get($2);
          }else{
              cur = new dbclib.EnvironmentVariable();
          }

          cur.name = $2;
          cur.type = $4;
          cur.min = $6;
          cur.max = $8;
          cur.unit = $10;
          cur.initialVal = $11;
          cur.id = $id;
          cur.transmitters = $transmitters;

          db.environmentVariables.set($2, cur);
    };

env_var_type
    : DECIMAL {
        if($1 == '0'){
            $$ = 0;
        }else if($1 == '1'){
            $$ = 1;
        }else if($1 == '2'){
            $$ = 2;
        }else{
            db.parseErrors.push(new dbclib.DBCError(yylineno, "Environment variable type should be 0,1,2: \n(0: Int, 1: Float, 2: String)", 1));
            $$ = 2;
        }
    };

access_type
    : DUMMY_NODE_VECTOR0 {$$ = 0x0;}
    | DUMMY_NODE_VECTOR1 {$$ = 0x1;}
    | DUMMY_NODE_VECTOR2 {$$ = 0x2;}
    | DUMMY_NODE_VECTOR3 {$$ = 0x3;}
    | DUMMY_NODE_VECTOR8000 {$$ = 0x8000;}
    | DUMMY_NODE_VECTOR8001 {$$ = 0x8001;}
    | DUMMY_NODE_VECTOR8002 {$$ = 0x8002;}
    | DUMMY_NODE_VECTOR8003 {$$ = 0x8003;};

//----------------------
// ENVVAR_DATA section
env_var_datas
    : %empty
    | env_var_datas env_var_data;

env_var_data
    : ENVVAR_DATA UNSAFE_WORD COLON DECIMAL SEMICOLON EOL{
        db.environmentVariables.get($2).type = 3;
        db.environmentVariables.get($2).dataSize = $4;
    };

//----------------------
// environment variable val descriptions
env_var_val_descr
    : VAL UNSAFE_WORD val_table_descriptions SEMICOLON EOL {
        // TODO: raise error if not exist
        db.environmentVariables.get($2).valueDescriptions = $3;
    };

//----------------------
// SGTYPE section
signal_types
    : %empty
    | signal_types signal_type;

signal_type
    : SGTYPE UNSAFE_WORD COLON DECIMAL VBAR byte_order signal_val_type 
      OPEN_PAREN number COMMA number CLOSE_PAREN 
      OPEN_BRACK number VBAR number CLOSE_BRACK 
      QUOTED_STRING number COMMA UNSAFE_WORD SEMICOLON EOL {
          var cursigType = new dbclib.SignalType(
              $2, /* name */
              $4, /* size */
              $6, /* byte_order */
              $7, /* val_type */
              $9, /* factor */
              $11, /* offset */
              $14, /* min */
              $16, /* max */
              $18, /* unit */
              $19, /* default value */
              $21  /* valTableName */
          )
        // TODO: uncomment
        //   db.signalTypes.set($2, cursigType);
      };

//----------------------
// CM section
comments
    : %empty
    | comments comment;

comment
    : CM QUOTED_STRING SEMICOLON EOL{
        db.comment = $QUOTED_STRING;
    } // -1 for the EOL
    | CM BU UNSAFE_WORD QUOTED_STRING SEMICOLON EOL {
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined node name: " + $UNSAFE_WORD, 0, $UNSAFE_WORD);
        error.addMapCondition(db.nodes, $UNSAFE_WORD);
        db.parseErrors.push(error);


        if(db.nodes.has($UNSAFE_WORD))
            db.nodes.get($UNSAFE_WORD).comment = $QUOTED_STRING;
    }
    | CM BO id QUOTED_STRING SEMICOLON EOL {
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined message: " + $id, 0, $id);
        error.addMapCondition(db.messages, $id);
        db.parseErrors.push(error);

        if(db.messages.has($id))
            db.messages.get($id).comment = $QUOTED_STRING;
    }
    | CM SG id UNSAFE_WORD QUOTED_STRING SEMICOLON EOL {       
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined message: " + $id, 0, $UNSAFE_WORD);
        error.addMapCondition(db.messages, $id);
        db.parseErrors.push(error);

        var error2 = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Signal '" +$UNSAFE_WORD+"' NOT IN message " + $id, 0, $UNSAFE_WORD);
        error2.addMapCondition(db.messages.get($id)?.signals, $UNSAFE_WORD);
        db.parseErrors.push(error2);

        if(db.messages.has($id) && db.messages.get($id).signals.has($UNSAFE_WORD))
            db.messages.get($id).signals.get($UNSAFE_WORD).comment = $QUOTED_STRING;

    }
    | CM EV UNSAFE_WORD QUOTED_STRING SEMICOLON EOL {

        if(db.environmentVariables.has($UNSAFE_WORD))
            db.environmentVariables.get($UNSAFE_WORD).comment = $QUOTED_STRING;
    };

//----------------------
// BA_DEF section

attribute_deffinitions
    : %empty
    | attribute_deffinitions attribute_definition;

attribute_definition
    : BA_DEF attr_obj_type QUOTED_STRING attr_val_type SEMICOLON EOL {
        db.attrDefs.set($3, new dbclib.AttributeDef($3, $2, $4));
    }
    | BA_DEF_REL attr_obj_type QUOTED_STRING attr_val_type SEMICOLON EOL{
        db.attrDefs.set($3, new dbclib.AttributeDef($3, $2, $4));
    };

attr_obj_type
    : %empty { $$ = 0}
    | BU { $$ = 1}
    | BO { $$ = 2}
    | SG { $$ = 3}
    | EV { $$ = 4}
    | BU_EV_REL { $$ = 5}
    | BU_BO_REL { $$ = 6}
    | BU_SG_REL { $$ = 7};

attr_val_type
    : INT number number {
        $$ = new dbclib.ValueType(0);
        $$.min = $2;
        $$.max = $3;
    }
    | HEX number number {
        $$ = new dbclib.ValueType(1);
        $$.min = $2;
        $$.max = $3;
    }
    | FLOAT number number{
        $$ = new dbclib.ValueType(2);
        $$.min = $2;
        $$.max = $3;
    }
    | STRING{
        $$ = new dbclib.ValueType(3);
    }
    | ENUM enumVals{
        $$ = new dbclib.ValueType(4);
        $$.enumVals = $2;
    };

enumVals
    : QUOTED_STRING {
        $$ = [];
        $$.push($1);
    }
    | enumVals COMMA QUOTED_STRING{
        $$ = $1;
        $$.push($3);
    };

//----------------------
// BA_DEF_DEF section
attribute_defaults
    : %empty
    | attribute_defaults attribute_default;

// TODO: attribute defaults
attribute_default
    : BA_DEF_DEF QUOTED_STRING attribute_val SEMICOLON EOL {

    }
    | BA_DEF_DEF_REL QUOTED_STRING attribute_val SEMICOLON EOL {

    };

attribute_val 
    : number { $$ = $1}
    | QUOTED_STRING {$$ = $1};

//----------------------
// SIG_GROUP section
signal_groups
    : %empty
    | signal_groups signal_group;

signal_group
    : SIG_GROUP DECIMAL UNSAFE_WORD DECIMAL COLON signal_names SEMICOLON EOL{
        // TODO make sure we don't reference a message that doesn't exist
        var curGroup;
        if(db.messages.has($2) && db.messages.get($2).signalGroups.has($3)){
            curGroup = db.messages.get($2).signalGroups.get($3);
            // throw error?
        }else{
            curGroup = new dbclib.SignalGroup();
        }
        curGroup.messageId = $2;
        curGroup.name = $3;
        curGroup.repetitions = $4;
        curGroup.signals = $6;
        if(db.messages.has($2))
            db.messages.get($2).signalGroups.set($3, curGroup);
    };

signal_names
    : { $$ = []}
    | signal_names UNSAFE_WORD{
        $$ = $1;
        $$.push($UNSAFE_WORD);
    };
//----------------------
// VAL_ section
val_descriptions
    : %empty
    | val_descriptions val_descr_for_sig
    | val_descriptions env_var_val_descr;

val_descr_for_sig
    : VAL id UNSAFE_WORD val_table_descriptions SEMICOLON EOL {
        if(db.messages.has($id) && db.messages.get($id).signals.has($UNSAFE_WORD))
            db.messages.get($id).signals.get($UNSAFE_WORD).valTable = $val_table_descriptions;
    };

//----------------------
// BA section
attribute_valssss
    : %empty
    | attribute_valssss attribute_vals;

attribute_vals
    : BA QUOTED_STRING attribute_val SEMICOLON EOL {
        // network attribute
        var attribute = new dbclib.Attribute($2, 0, $3);
        db.attributes.set($2, attribute);
    }
    | BA QUOTED_STRING BU UNSAFE_WORD attribute_val SEMICOLON EOL {
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined node: " + $4, 0, $QUOTED_STRING);
        error.addMapCondition(db.nodes, $4);
        db.parseErrors.push(error);

        var attribute = new dbclib.Attribute($2, 1, $4);

        if(db.nodes.has($4) && db.nodes.get($4).attributes.has($2))
            db.nodes.get($4).attributes.set($2,attribute);
    }
    | BA QUOTED_STRING BO id attribute_val SEMICOLON EOL {
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined message: " + $4, 0, $QUOTED_STRING);
        error.addMapCondition(db.messages, $4);
        db.parseErrors.push(error);

        var attribute = new dbclib.Attribute($2, 2, $5);
        if(db.messages.has($4) && db.messages.get($4).attributes.has($2))
            db.messages.get($4).attributes.set($2, attribute);
    }
    | BA QUOTED_STRING SG id UNSAFE_WORD attribute_val SEMICOLON EOL {
        var error = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined message: " + $4, 0, $QUOTED_STRING);
        error.addMapCondition(db.messages, $4);
        db.parseErrors.push(error);

        var error2 = new dbclib.DBCError(yy.lexer.yylloc.first_line-1, "Undefined signal: '" + $5 + "'", 0, $QUOTED_STRING);
        error2.addMapCondition(db.messages.get($4)?.signals, $5);
        db.parseErrors.push(error2);

        var attribute = new dbclib.Attribute($2, 3, $6);

        if(db.messages.has($4) && db.messages.get($4).signals.has($5))
            db.messages.get($4).signals.get($5).attributes.set($2, attribute);

    }
    | BA QUOTED_STRING EV UNSAFE_WORD attribute_val SEMICOLON EOL {
        if(!db.environmentVariables.has($4)){
            // db.parseErrors.push(new DBCParseError(yy.lexer.yylloc.first_line-1, "Cannot assgn environment variable attribute to undefined environment variable '" + $4 + "'\nUndefined Environment Variable: " + $4));
        }else{
            var attribute = new dbclib.Attribute($2, 4, $5);
            db.environmentVariables.get($4).attributes.set($2, attribute);
        }
    }
    | BA_REL QUOTED_STRING BU_EV_REL UNSAFE_WORD UNSAFE_WORD attribute_val SEMICOLON EOL{
        
    }
    | BA_REL QUOTED_STRING BU_BO_REL UNSAFE_WORD id attribute_val SEMICOLON EOL{

    }
    | BA_REL QUOTED_STRING BU_SG_REL UNSAFE_WORD SG id UNSAFE_WORD attribute_val SEMICOLON EOL {
        
    };
    // TODO: add actions here

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


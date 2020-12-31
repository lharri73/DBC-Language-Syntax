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

DIGIT           [0-9]
NONDIGIT        [_a-zA-Z]
HEX_PREFIX      ("0X"|"0x")
HEX_DIGIT       [0-9a-fA-F]
EPONENT         ([Ee][+-]?{DIGIT}+)
// WORD            [a-zA-Z0-9]     /* not '_' */
U_WORD          [a-zA-Z0-9-_\\.]
DEFINER         (?![a-zA-Z])


%%
[ \t]                              /* skip whitespace */

"VERSION"                           {return "VERSION"}
"NS_"{DEFINER}                      {return "NS"}
"BO_"{DEFINER}                      {return "BO"}
"BS_"{DEFINER}                      {return "BS"}
"BU_"{DEFINER}                      {return "BU"}
"VAL_TABLE_"{DEFINER}               {return "VAL_TABLE"}
"SG_"{DEFINER}                      {return "SG"}
"BO_TX_BU_"{DEFINER}                {return "BO_TX_BU"}
"EV_"{DEFINER}                      {return "EV"}
"SGTYPE_"{DEFINER}                  {return "SGTYPE"}
"ENVVAR_DATA_"{DEFINER}             {return "ENVVAR_DATA"}
"SIG_GROUP_"{DEFINER}               {return "SIG_GROUP"}
"CM_"{DEFINER}                      {return "CM"}
"BA_DEF_"{DEFINER}                  {return "BA_DEF"}
"BA_DEF_REL_"{DEFINER}              {return "BA_DEF_REL"}
"INT"{DEFINER}                      {return "INT"}
"HEX"{DEFINER}                      {return "HEX"}
"FLOAT"{DEFINER}                    {return "FLOAT"}
"STRING"{DEFINER}                   {return "STRING"}
"ENUM"{DEFINER}                     {return "ENUM"}
"VECTOR_XXX"{DEFINER}               {return "VECTOR_XXX"}
"DUMMY_NODE_VECTOR0"{DEFINER}       {return "DUMMY_NODE_VECTOR0"}
"DUMMY_NODE_VECTOR1"{DEFINER}       {return "DUMMY_NODE_VECTOR1"}
"DUMMY_NODE_VECTOR2"{DEFINER}       {return "DUMMY_NODE_VECTOR2"}
"DUMMY_NODE_VECTOR3"{DEFINER}       {return "DUMMY_NODE_VECTOR3"}
"DUMMY_NODE_VECTOR8000"{DEFINER}    {return "DUMMY_NODE_VECTOR8000"}
"DUMMY_NODE_VECTOR8001"{DEFINER}    {return "DUMMY_NODE_VECTOR8001"}
"DUMMY_NODE_VECTOR8002"{DEFINER}    {return "DUMMY_NODE_VECTOR8002"}
"DUMMY_NODE_VECTOR8003"{DEFINER}    {return "DUMMY_NODE_VECTOR8003"}

// punctuation
"|"                             {return "VBAR"}
":"                             {return "COLON"}
","                             {return "COMMA"}
";"                             {return "SEMICOLON"}
"@"                             {return "AT"}
"+"                             {return "PLUS"}
"-"                             {return "MINUS"}
"("                             {return "OPEN_PAREN"}
")"                             {return "CLOSE_PAREN"}
"["                             {return "OPEN_BRACK"}
"]"                             {return "CLOSE_BRACK"}

([ ]*[\r\n]+)+                  {return "EOL"}
{HEX_PREFIX}{HEX_DIGIT}+        {return "HEX"}
{UNSAFE_WORD}                   {return "UNSAFE_WORD"}
{DIGIT}+"."?{DIGIT}*{EPONENT}   {return "DECIMAL_EXP"}
{DIGIT}+"."{DIGIT}+             {return "DECIMAL_POINT"}
{DIGIT}+                        {return "DECIMAL"}
// {WORD}+                         {return "DBC_WORD"}
{U_WORD}+                       {return "UNSAFE_WORD"}
// [a-zA-z]\w*                     {return "REG_WORD"}
\"[^\"]*\"                      {yytext = yytext.substr(1,yyleng-2); 
                                 return 'QUOTED_STRING';}

\s*<<EOF>>                      {return "ENDOFFILE"}

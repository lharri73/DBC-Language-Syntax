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

"VERSION"                       {return "VERSION"}
"NS_"{DEFINER}                  {return "NS"}
"BO_"{DEFINER}                  {return "BO"}
"BS_"{DEFINER}                  {return "BS"}
"BU_"{DEFINER}                  {return "BU"}
"VAL_TABLE_"{DEFINER}           {return "VAL_TABLE"}
"SG_"{DEFINER}                  {return "SG"}
"BO_TX_BU_"{DEFINER}            {return "BO_TX_BU"}
"VECTOR_XXX"                    {return "VECTOR_XXX"}

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

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

%%
" "     /* skip whitespace */

"VERSION"                       {return "VERSION"}
([ ]*[\r\n]+)+                  {return "EOL"}
{HEX_PREFIX}{HEX_DIGIT}+        {return "HEX"}
{DIGIT}+"."?{DIGIT}*{EPONENT}   {return "DECIMAL"}
{DIGIT}+"."{DIGIT}+             {return "DECIMAL"}
{DIGIT}+                        {return "DECIMAL"}




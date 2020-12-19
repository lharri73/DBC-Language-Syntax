# DBC Language Syntax

This extension provides basic syntax highlighting, bracket completion, and code snippets 
for the Vector DBC file format. This is created to work with version 2 of the Vector 
DBC file format.

Although DBC files are often programmatically generated, it can be useful to
more easily read the DBC file itself in a plaintext format. 
Syntax highlighting is handled locally through VSCode's 
integrated TextMates language parsing engine, using PCRE regular 
expressions to match syntax. 

## Supported keywords
- NS_ 
- CM_
- BA_DEF_
- BA_
- VAL_
- FILTER
- BA_DEF_DEF_
- SGTYPE_
- SGTYPE_VAL_
- VAL_TABLE_
- BO_TX_BU_
- BA_DEF_REL_
- BA_REL_
- BA_DEF_DEF_REL_
- BU_SG_REL_
- BU_EV_REL_
- BU_BO_REL_

## Known Issues

1. Attribute definitions that wrap lines may not be highlighted on the following
   lines. 
1. Signals that are multiplexed will not be recognized

## Todo items
- Promote to language server
- Include debugging (invalid offset, start bit, min, max, etc)
- Hover box to show all related fields as a hint

## License
GNU General Public License v2.0 only

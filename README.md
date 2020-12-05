# DBC Language Syntax

This extension provides basic syntax highlighting and bracket completion for the Vector DBC file format. 
This is created to work with version 2 of the DBC file format, 
defined [here](https://bitbucket.org/tobylorenz/vector_dbc/src/master/src/Vector/DBC/Parser.yy)
in the official Vector DBC language repository. 

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

1. Scientific notation in min/max fields are not all considered part of the constant and are, thus, not highlighted

1. Scientific notation in the factor or offset causes the entire signal to not be recognized

## Todo items
- promote to language server
- include debugging (invalid offset, start bit, min, max, etc)
- hover box to show all related fields as a hint
s
## Release Notes

### 1.0.0: 
Initial release

# DBC Language Syntax

This extension provides basic syntax highlighting and bracket completion for the Vector DBC file format. 
This is created to work with version 2 of the DBC file format, 
defined [here](https://bitbucket.org/tobylorenz/vector_dbc/)
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

1. Attribute definitions that wrap lines may not be highlighted on the following
   lines. 
1. Signals that are multiplexed will not be recognized

## Todo items
- promote to language server
- include debugging (invalid offset, start bit, min, max, etc)
- hover box to show all related fields as a hint

## Release Notes

### 1.0.0: 
- Initial release

### 1.0.1:
- Updated package description

### 1.0.2:
- Fixed comment wrapping
- Fixed scientific notation in min/max and factor/offset
- Updated package metadata

### 1.0.3:
- Updated first line matching

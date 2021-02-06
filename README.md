# DBC Language Syntax

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/lharri73.dbc?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/lharri73/DBC-Language-Syntax/DBC%20language%20CI?style=flat-square)

This extension provides basic syntax highlighting, bracket completion, code snippets 
and lexer/parser errors for the Vector DBC file format. 
This is created to work with version 2 of the [Vector DBC file format](https://bitbucket.org/tobylorenz/vector_dbc/src/master/).

Although DBC files are often programmatically generated, it can be useful to
more easily read the DBC file itself in a plaintext format. 
Syntax highlighting is handled locally through VSCode's 
integrated TextMates language parsing engine, using PCRE regular 
expressions to match syntax. 

## Syntax Highlighting
<img src="res/syntax.png" width="500">

## Lexicographic and Parser Errors
<img src="res/errors.gif" width="800">

## Commonly Used Snippets
<img src="res/snippets.gif" width="800">

## Supported keywords
- BA
- BA_DEF
- BA_DEF_DEF
- BA_DEF_DEF_REL
- BA_DEF_REL
- BA_REL
- BO
- BO_TX_BU
- BS
- BU
- BU_SG_REL
- CM
- EV
- NS
- SG
- SGTYPE
- SIG_GROUP
- VAL
- VAL_TABLE
- VERSION
## Known Issues
1. Attribute definitions that wrap lines may not be highlighted on the following
   lines. 
1. Signals that are multiplexed will not be recognized

## Todo items
- Include debugging (invalid offset, start bit, min, max, etc)
- Hover box to show all related fields as a hint

## License
GNU General Public License v2.0 only

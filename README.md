# DBC Language Syntax

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/lharri73.dbc?style=flat-square)

This extension provides basic syntax highlighting, bracket completion, code
snippets, lexer/parser errors, and a preview window for the Vector DBC file format. 
This is created to work with version 2 of the [Vector DBC file format](https://bitbucket.org/tobylorenz/vector_dbc/src/master/).

Although DBC files are often programmatically generated, it can be useful to
more easily read the DBC file itself in a plaintext format. 
Syntax highlighting is handled locally through VSCode's 
integrated TextMates language parsing engine, using PCRE regular 
expressions to match syntax. 

This extension also provides a sidebar to preview messages in the current, open
DBC file. While this doesn't allow editing, it takes information from various
parts of the DBC and makes it easily readable and searchable. 

*The preview window is still a work in progress!*

## Syntax Highlighting
<img src="res/syntax.png" width="500">

## Message and Signal Preview
<img src="res/sidebar.gif" width="800">

## Lexicographic and Parser Errors
<img src="res/errors.gif" width="800">

## Commonly Used Snippets
<img src="res/snippets.gif" width="800">

## Known Issues
1. Attribute definitions that wrap lines may not be highlighted on the following
   lines. 
1. Signals that are multiplexed will not be recognized

## Todo items
- Include debugging (invalid offset, start bit, min, max, etc)
- Show more information about each signal (val tables, comments, etc.)
- Show the byte structure of the message

## Organization
- `server`
  - Contains the language server and parser for the dbc language sytax
- `client`
  - Contains the editor and viewer
- `dbcLib`
  - basic type descriptions of each element/class of the dbc language

## 3rd Party Libraries
- [Vector DBC file format](https://bitbucket.org/tobylorenz/vector_dbc/src/master/).
  - Although no code from this repository is used in this extension, this served
    as a reference for the DBC format and syntax. 
- [jison](https://github.com/zaach/jison)
  - The parser and lexer used on the server side to parse dbc files
- [React.js](https://reactjs.org/)
  - Used to display the parsed message/signal data in the vscode browser panel. 
- [MessagePack](https://msgpack.org/)
  - Serializes the parsed DBC file's intermediate representation into a packed
    binary before sending to the browser panel.

## License
GNU General Public License v2.0 only

# DBC Language Syntax

This extension provides basic syntax highlighting and bracket completion for the Vector DBC file format. 
This is created to work with version 2 of the DBC file format, defined [here](https://bitbucket.org/tobylorenz/vector_dbc/src/master/src/Vector/DBC/Parser.yy)
in the official Vector DBC language repository. 

Although DBC files are often programatically generated, it can be usefull to more easily read the dbc itself in a plaintext format. 
This allows you to do just that without loading a dbc editor, simply working within the VSCode editor itself. 

## Known Issues

1. Scientific notation in min/max fields are not all considered part of the constant and are, thus, not highlighted

1. Scientific notation in the factor or offset causes the entire signal to not be recognized

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release

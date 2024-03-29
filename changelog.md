# Changelog

# 1.0.0: 
- Initial release

# 1.0.1:
- Updated package description

# 1.0.2:
- Fixed comment wrapping
- Fixed scientific notation in min/max and factor/offset
- Updated package metadata

# 1.0.3:
- Updated first line matching

# 1.1.0:
- Added basic snippets
  
# 1.2.0
- Promoted to internal language server
- Serves as a parser and throws basic parser and lexer errors

# 1.2.1 
- Fixed vscode_ignore to exclude node_modules

# 1.2.2
- Added more useful errors and warnings
- Fixed line number that error occurs on when present
- Changed when parse occurs (now on save)

# 1.2.3
- Fixed crashing issue that prevented parsing
- Added option to silence warnings from undefined objects

# 2.0.0
- Restructure of entire extension
- Added DBCLib to contain all components of dbc file
- Separated client and server code
- Added react-based side window that shows basic preview of messages & signals

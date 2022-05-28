# Copyright (C) 2022  Landon Harris

# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
SHELL := /bin/bash

dbclib := dbcLib/dist/index.js
client := client/build/ext-src/serverPack.js
server := server/dist/serverPack.js

all: syntaxes $(dbclib) $(client) $(server)
client: $(client)
server: $(server)
dbclib: $(dbclib)

$(dbclib): $(wildcard dbcLib/*.ts) $(wildcard dbcLib/dbc/*.ts)
	cd dbcLib && tsc && webpack --mode production
	rm -rf ./{client,server}/dbcLib
	mkdir -p client/dbcLib server/dbcLib
	# cp -r dbcLib/{dist,build,package.json,package-lock.json,node_modules} client/src/dbcLib/
	# cp -r dbcLib/{dist,build,package.json,package-lock.json,node_modules} server/dbcLib/

$(client): $(dbclib) $(wildcard client/ext-src/*.ts) $(wildcard client/public/*) $(wildcard client/scripts/*.js) $(wildcard client/src/*)
	cd client && npm run build
	# cp client/dist/* client/build/ext-src/

$(server): $(dbclib) $(wildcard server/src/*.ts) server/dbc.jison server/dbc.lex
	cd server && npm run build


.PHONY: syntaxes
syntaxes: syntaxes/dbc.tmLanguage.json snippets/snippets.json

syntaxes/dbc.tmLanguage.json: syntaxSrc/dbcLang.yml
	npx js-yaml syntaxSrc/dbcLang.yml > syntaxes/dbc.tmLanguage.json

snippets/snippets.json: syntaxSrc/snippets.yml
	npx js-yaml syntaxSrc/snippets.yml > snippets/snippets.json

.PHONY: clean
clean:
	rm -f syntaxes/dbc.tmLanguage.json snippets/snippets.json
	rm -rf client/build client/dist
	rm -rf dbcLib/build dbcLib/dist
	rm -rf server/dist server/out
	rm *.vsix
	# rm -rf {client,server}/dbcLib

.PHONY: package
package: $(dbclib) $(client) $(server) syntaxes
	vsce package

# Copyright (C) 2020  Landon Harris

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
all: src/dbcLang.yml
	npx js-yaml src/dbcLang.yml > syntaxes/dbc.tmLanguage.json
	npx js-yaml src/snippets.yml > snippets/snippets.json

clean:
	rm -f syntaxes/dbc.tmLanguage.json snippets/snippets.json

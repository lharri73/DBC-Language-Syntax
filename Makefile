
all: src/dbcLang.yml
	npx js-yaml src/dbcLang.yml > syntaxes/dbc.tmLanguage.json

clean:
	rm -f syntaxes/dbc.tmLanguage.json

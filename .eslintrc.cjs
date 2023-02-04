const RULES = {
	OFF: "off",
	ERROR: "error",
	WARN: "warn"
}

module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			RULES.ERROR,
			"tab"
		],
		"quotes": [
			RULES.ERROR,
			"double"
		],
		"semi": [
			RULES.ERROR,
			"never"
		],
		"linebreak-style": [RULES.ERROR, "unix"],
		"max-len": [RULES.ERROR, {code: 100}],
		"no-empty": [RULES.WARN],
		"react/react-in-jsx-scope": RULES.OFF
	}
}

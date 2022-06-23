module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab",
		],
		// Using linbreak style breaks on this file but works on others no matter if unix or windows
		"linebreak-style": 0,
		"quotes": [
			"error",

			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "always"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
	}
};

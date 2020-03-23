const parserOptions = {
	ecmaVersion: 2018,
	sourceType: 'module',
	ecmaFeatures: {
		jsx: true,
	},
};

const rules = {
	'indent': ['error', 'tab'],
	'no-tabs': 'off',
	'sort-imports': ['warn', {
		ignoreCase: true,
		ignoreDeclarationSort: true,
	}],

	'import/order': ['error', {
		alphabetize: { order: 'asc' },
		'newlines-between': 'always',
	}],
	'import/prefer-default-export': 'off',

	'react/jsx-indent': ['error', 'tab'],
	'react/require-default-props': ['error', { ignoreFunctionalComponents: true }]
};

module.exports = {
	parser: 'babel-eslint',
	parserOptions,
	env: {
		browser: true,
		jest: true,
		node: true,
	},

	extends: [
		'eslint:recommended',
		'airbnb',
		'airbnb/hooks',
	],
	ignorePatterns: [
		'dist/*',
	],
	rules,
	overrides: [
		// TypeScript files
		{
			files: ['**/*.ts?(x)'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				...parserOptions,
				// typescript-eslint specific options
				warnOnUnsupportedTypeScriptVersion: true,
			},

			plugins: ['@typescript-eslint'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'airbnb',
				'airbnb/hooks',
				'plugin:@typescript-eslint/recommended',
			],
			rules: {
				...rules,

				indent: 'off',
				'@typescript-eslint/indent': ['error', 'tab'],
			}
		}
	],
};

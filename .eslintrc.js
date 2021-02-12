module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
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
	rules: {
		indent: ['error', 'tab'],
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
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
		'react/require-default-props': ['error', { ignoreFunctionalComponents: true }],
		'react/no-array-index-key': 'off',
		'no-nested-ternary': 'off'
	},
};

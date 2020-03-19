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
	'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

	'react/jsx-indent': ['error', 'tab'],
	'react/jsx-indent-props': ['error', 'tab'],
	'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
	'react/require-default-props': ['error', { ignoreFunctionalComponents: true }],
	'react/no-array-index-key': 'off',
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

			plugins: ['@typescript-eslint', 'import'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'airbnb',
				'airbnb/hooks',
				'plugin:@typescript-eslint/recommended',
				'plugin:import/typescript',
			],
			rules: {
				...rules,

				indent: 'off',
				'@typescript-eslint/indent': ['error', 'tab'],

				'import/extensions': ['error', 'ignorePackages', {
					'js': 'never',
					'jsx': 'never',
					'ts': 'never',
				}],
			}
		}
	],
};

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
	'react/require-default-props': ['error', { ignoreFunctionalComponents: true }],
	'react/jsx-indent-props': ['error', 'tab'],
	'react/no-array-index-key': 'off',
	'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
	'import/no-extraneous-dependencies': [
		'error',
		{
			'devDependencies': [
				'**/*.test.{js,jsx}',
				'**/*.spec.{js,jsx}',
				'**/*.stories.mdx',
				'**/*.mock.{js,jsx}',
				'rollup.config.js',
				'src/setupTests.js',
				'scripts/jest-setup.js',
			],
		},
	],
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

// <<<<<<< HEAD
// const parserOptions = {
// 	ecmaVersion: 2018,
// 	sourceType: 'module',
// 	ecmaFeatures: {
// 		jsx: true,
// 	},
// };

// const rules = {
// 	'indent': ['error', 'tab'],
// 	'no-tabs': 'off',
// 	'sort-imports': ['warn', {
// 		ignoreCase: true,
// 		ignoreDeclarationSort: true,
// 	}],

// 	'import/order': ['error', {
// 		alphabetize: { order: 'asc' },
// 		'newlines-between': 'always',
// 	}],
// 	'import/prefer-default-export': 'off',
// 	'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

// 	'react/jsx-indent': ['error', 'tab'],
// 	'react/require-default-props': ['error', { ignoreFunctionalComponents: true }],
// 	'react/jsx-indent-props': ['error', 'tab'],
// 	'react/no-array-index-key': 'off',
// 	'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
// 	'import/no-extraneous-dependencies': [
// 		'error',
// 		{
// 			'devDependencies': [
// 				'**/*.test.{js,jsx}',
// 				'**/*.spec.{js,jsx}',
// 				'**/*.stories.mdx',
// 				'**/*.mock.{js,jsx}',
// 				'rollup.config.js',
// 				'src/setupTests.js',
// 				'scripts/jest-setup.js',
// 			],
// 		},
// 	],
// };

// =======
// >>>>>>> feature/RED-182-column-sort
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
	},
};

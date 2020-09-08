module.exports = {
	extends: 'stylelint-config-standard',
	plugins: [
		'stylelint-scss',
	],
	ignoreFiles: [
		'node_modules/',
		'dist/',
	],
	rules: {
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,

		indentation: 'tab',
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
	},
};

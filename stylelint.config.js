module.exports = {
	extends: 'stylelint-config-standard',
	ignoreFiles: [
		'node_modules/',
		'dist/',
	],
	rules: {
		indentation: 'tab',
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
	},
};

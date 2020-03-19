module.exports = {
	setupFiles: ['./scripts/jest-setup.js'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	moduleNameMapper: {
		// This is needed to mock css Modules
		// For more information. You can refer to the Jest docs
		// https://jestjs.io/docs/en/webpack.html
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
};

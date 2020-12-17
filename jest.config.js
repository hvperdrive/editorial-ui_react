module.exports = {
	setupFiles: ['./scripts/jest-setup.js'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	testEnvironment: 'jest-environment-jsdom-sixteen',
	moduleNameMapper: {
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};

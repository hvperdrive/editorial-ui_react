module.exports = {
	setupFiles: ['./scripts/jest-setup.js'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	moduleNameMapper: {
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};

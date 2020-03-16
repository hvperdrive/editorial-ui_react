module.exports = {
	stories: ['../src/**/*.stories.(js[x]|mdx)'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-a11y/register',
		'@storybook/addon-docs',
	],
};

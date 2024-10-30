import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	staticDirs: ['../static'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	viteFinal(config) {
		config.resolve = {
			alias: {
				'@': new URL('../src', import.meta.url).toString(),
				'@/*': new URL('../src/*', import.meta.url).toString()
			}
		};
		return config;
	}
};
export default config;

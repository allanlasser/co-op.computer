import type { Preview } from '@storybook/svelte';

import '$lib/styles/app.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		sveltekit_experimental: {
			stores: {
				page: {
					url: new URL('http://localhost:6006/'),
					data: {
						test: 'passed'
					}
				},
				navigating: {
					route: {
						id: '/storybook'
					}
				},
				updated: true
			}
		}
	}
};

export default preview;

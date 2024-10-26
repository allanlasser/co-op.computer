import type { Meta, StoryObj } from '@storybook/svelte';

import NavigationComponent from '../Navigation.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Layout / Navigation',
	component: NavigationComponent,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<NavigationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Navigation: Story = {
	args: {}
};

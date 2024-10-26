import type { Meta, StoryObj } from '@storybook/svelte';

import AboutComponent from '../About.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'About',
	component: AboutComponent,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<AboutComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const About: Story = {
	args: {}
};

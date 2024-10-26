import type { Meta, StoryObj } from '@storybook/svelte';

import ToolListItem from '../ToolListItem.svelte';
import { tool } from '@/tests/fixtures/tools';
import { user } from '@/tests/fixtures/users';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Tool / List Item',
	component: ToolListItem,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<ToolListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const IsOwner: Story = {
	args: {
		tool,
		owner: user,
		isOwner: true
	}
};

export const IsNotOwner: Story = {
	args: {
		tool,
		owner: user,
		isOwner: false
	}
};

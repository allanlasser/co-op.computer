import type { Meta, StoryObj } from '@storybook/svelte';
import Search from '../Search.svelte';

const meta = {
	title: 'UI / Search',
	component: Search,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithQuery: Story = {
	args: {
		query: 'a wheelbarrow'
	}
};
export const Loading: Story = {
	args: {
		...WithQuery.args,
		loading: true
	}
};
export const WithError: Story = {
	args: {
		...WithQuery.args,
		error: 'Something went wrong'
	}
};

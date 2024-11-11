import type { Meta, StoryObj } from '@storybook/svelte';

import NewAccountForm from '../NewAccountForm.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Forms / New Account',
	component: NewAccountForm,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<NewAccountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty: Story = {
	args: {}
};

export const WithInvitation: Story = {
	args: {
		invitation: 'e7b8a6d4-3b2f-4f5b-8b9a-1e2d3c4b5f6a'
	}
};

export const WithErrors: Story = {
	args: {
		errors: {
			email: ['Email is required', 'Invalid email'],
			username: ['Username must be at least two characters', 'Username is already in use'],
			password: ['Password is required', 'Password must be more than 8 characters'],
			invitation: ['Invalid invitation code', 'Invalid invitation code']
		}
	}
};

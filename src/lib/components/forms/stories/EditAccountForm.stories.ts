import type { Meta, StoryObj } from '@storybook/svelte';

import EditAccount from '../EditAccount.svelte';
import { user } from '@/tests/fixtures/users';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Forms / Edit Account',
	component: EditAccount,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<EditAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithUser: Story = {
	args: {
		user
	}
};

export const WithErrors: Story = {
	args: {
		user,
		errors: {
			email: ['Email is required', 'Invalid email'],
			username: ['Username must be at least two characters', 'Username is already in use'],
			password: ['Password is required', 'Password must be more than 8 characters'],
			invitation: ['Invalid invitation code', 'Invalid invitation code']
		}
	}
};

import type { Meta, StoryObj } from '@storybook/svelte';

import PasswordResetEmail from '../PasswordReset.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Email / Password Reset',
	component: PasswordResetEmail,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<PasswordResetEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PasswordReset: Story = {
	args: {
		origin: 'http://localhost:6006',
		code: '7a2f8d14e9b3c5603a1f94d2578c6b0e4f9d3271ae5b8c904f2d16937m8k4p2q9w5x7n3j6h8t4v1y5u8i4o2p7l3k9m5b2c6v4x8z1'
	}
};

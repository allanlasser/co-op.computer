import type { Meta, StoryObj } from '@storybook/svelte';
import TerminalSvelte from '../Terminal.svelte';
import type { User } from '@/lib/db/schema';

const meta = {
	title: 'Terminal',
	component: TerminalSvelte,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<TerminalSvelte>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Terminal: Story = {
	args: {
		user: {
			username: 'allan'
		} as User
	}
};

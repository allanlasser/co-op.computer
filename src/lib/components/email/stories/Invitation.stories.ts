import type { Meta, StoryObj } from '@storybook/svelte';

import InvitationEmail from '../Invitation.svelte';
import { user } from '@/tests/fixtures/users';
import { invitation } from '@/tests/fixtures/invitations';
import { group } from '@/tests/fixtures/groups';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Email / Invitation',
	component: InvitationEmail,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<InvitationEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Invitation: Story = {
	args: {
		origin: 'http://localhost:6006',
		invitation: invitation,
		fromUser: user,
		toGroup: group
	}
};

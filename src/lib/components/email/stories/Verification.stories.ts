import type { Meta, StoryObj } from '@storybook/svelte';

import VerificationEmail from '../Verification.svelte';
import { verification } from '@/tests/fixtures/verifications';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Email / Verification',
	component: VerificationEmail,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<VerificationEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Verification: Story = {
	args: {
		origin: 'http://localhost:6006',
		verification
	}
};

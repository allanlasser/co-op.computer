import type { Meta, StoryObj } from '@storybook/svelte';
import RockerSwitchSvelte from '../RockerSwitch.svelte';

const meta = {
	title: 'Terminal / Hardware / Rocker Switch',
	component: RockerSwitchSvelte,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<RockerSwitchSvelte>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RockerSwitch: Story = {};

import type { Meta, StoryObj } from '@storybook/svelte';
import ScreenSvelte from '../Screen.svelte';
import FullscreenDecorator from '../../../../../../.storybook/decorators/FullscreenDecorator.svelte';

const meta = {
	title: 'Terminal / Hardware / Screen',
	component: ScreenSvelte,
	parameters: {
		layout: 'fullscreen'
	},
	// @ts-expect-error decorators are not properly typed
	decorators: [() => FullscreenDecorator]
} satisfies Meta<ScreenSvelte>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Screen: Story = {
	args: {
		powered: true
	}
};

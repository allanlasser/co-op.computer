import type { Meta, StoryObj } from '@storybook/svelte';
import OSSvlete from '../OS.svelte';
import TerminalDecorator from '@/../.storybook/decorators/TerminalDecorator.svelte';
import FullscreenDecorator from '@/../.storybook/decorators/FullscreenDecorator.svelte';
import type { User } from '@/lib/db/schema';

const meta = {
	title: 'Terminal / Software / Operating System',
	component: OSSvlete,
	parameters: {
		layout: 'fullscreen',
		sveltekit_experimental: {
			stores: {
				page: {
					url: '/',
					route: { id: '/' }
				}
			}
		}
	},
	// @ts-expect-error decorators are not properly typed
	decorators: [() => FullscreenDecorator, () => TerminalDecorator]
} satisfies Meta<OSSvlete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAnon: Story = {
	args: {}
};

export const WithUser: Story = {
	args: {
		user: {
			username: 'allan'
		} as User
	}
};

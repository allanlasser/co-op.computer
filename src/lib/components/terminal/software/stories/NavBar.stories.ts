import type { Meta, StoryObj } from '@storybook/svelte';
import NavBarSvelte from '../NavBar.svelte';
import TerminalDecorator from '@/../.storybook/decorators/TerminalDecorator.svelte';

const meta = {
	title: 'Terminal / Software / Nav Bar',
	component: NavBarSvelte,
	parameters: {
		layout: 'centered'
	},
	// @ts-expect-error decorators are not properly typed
	decorators: [() => TerminalDecorator]
} satisfies Meta<NavBarSvelte>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoActiveRoute: Story = {
	args: {
		route: '/'
	}
};

export const WithSearchActive: Story = {
	args: {
		route: '/search',
		searchQuery: 'wheelbarrow'
	}
};

export const WithGroupsActive: Story = {
	args: {
		route: '/groups'
	}
};

export const WithLoansActive: Story = {
	args: {
		route: '/loans'
	}
};

export const WithCatalogActive: Story = {
	args: {
		route: '/catalog'
	}
};

<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import DialogSvelte from '../Dialog.svelte';

	export const meta: Meta = {
		title: 'Terminal / Software / Dialog',
		component: DialogSvelte,
		parameters: {
			layout: 'centered'
		}
	};

	const args = {
		label: 'Name'
	};
</script>

<Template let:args>
	<DialogSvelte {...args} on:close>
		<p>Welcome to CO-OP, a system for sharing things you own with people you trust.</p>
		<p>Then, when you need something you don’t have, you can loan it from someone.</p>
		<p>If you have things you want to share, add them to your catalog for others to find.</p>
		<p>
			If you have any feedback, I’d love to hear it. Send me an email at <a
				href="mailto:allan@lasser.design">allan@lasser.design</a
			>.
		</p>
	</DialogSvelte>
</Template>

<Story name="Dialog" {args} />

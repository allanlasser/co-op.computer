<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Toast from '../Toast.svelte';

	export const meta: Meta = {
		title: 'UI / Toast',
		component: Toast,
		parameters: {
			layout: 'centered'
		}
	};

	const args = {
		type: 'info',
		message: 'This is a toast message'
	};
</script>

<Template let:args>
	<Toast type={args.type}>
		<p>{args.message}</p>
	</Toast>
</Template>

<Story name="Info" {args} />
<Story name="Success" args={{ type: 'success', message: 'This is a success toast' }} />
<Story name="Error" args={{ type: 'error', message: 'This is an error toast' }} />

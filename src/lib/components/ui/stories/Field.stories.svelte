<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Field from '../Field.svelte';

	export const meta: Meta = {
		title: 'UI / Field',
		component: Field,
		parameters: {
			layout: 'centered'
		}
	};

	const args = {
		label: 'Name'
	};
</script>

<Template let:args>
	<Field {...args}>
		<input type="text" />
	</Field>
</Template>

<Story name="Basic" {args} />
<Story name="With Help Text" args={{ ...args, help: 'Enter your full name' }} />
<Story
	name="With Error"
	args={{
		...args,
		errors: ['Username must be at least two characters']
	}}
/>
<Story
	name="With Errors"
	args={{
		...args,
		errors: ['Username must be at least two characters', 'Username is already in use']
	}}
/>

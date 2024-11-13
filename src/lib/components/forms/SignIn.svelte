<script lang="ts">
	import Field from '../ui/Field.svelte';

	export let errors: Record<string, string[]> = {};

	let email = '';
	let password = '';
</script>

<form method="POST">
	<Field label="Email" errors={errors.username}>
		<input type="email" name="email" bind:value={email} />
	</Field>
	<Field label="Password" errors={errors.password}>
		<input type="password" name="password" bind:value={password} />
	</Field>
	<footer>
		<button type="submit">Sign In</button>
	</footer>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}
</style>

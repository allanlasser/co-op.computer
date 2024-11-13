<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '../ui/Field.svelte';

	export let errors: Record<string, string[]> = {};

	let password = '';
	let confirmPassword = '';
</script>

<form action="/account/settings?/password" method="POST" aria-label="Edit account" use:enhance>
	<Field label="New Password" errors={errors?.password}>
		<input type="text" name="password" bind:value={password} />
	</Field>
	<Field label="Confirm New Password" errors={errors?.confirmPassword}>
		<input type="text" name="confirmPassword" bind:value={confirmPassword} />
	</Field>
	<button disabled={!password} type="submit" class="primary" style="min-width: 8em;">Save</button>
</form>

<style>
	form {
		flex: 1 1 auto;
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
	}
	button {
		align-self: flex-start;
	}
</style>

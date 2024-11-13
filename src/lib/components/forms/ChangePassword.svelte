<script lang="ts">
	import { enhance } from '$app/forms';
	import { isArray, isRecord } from '@/lib/utils/types';
	import Field from '../ui/Field.svelte';
	import Flash from '../ui/Flash.svelte';
	import Toast from '../ui/Toast.svelte';

	export let action: string;
	export let errors: string[] | Record<string, string[]> = {};

	$: formErrors = isArray(errors) ? errors : null;
	$: fieldErrors = isRecord(errors) ? errors : {};

	let password = '';
	let confirmPassword = '';
</script>

{#if formErrors}
	<Flash>
		<Toast type="error">
			<p>{formErrors.join(', ')}</p>
		</Toast>
	</Flash>
{/if}
<form {action} method="POST" aria-label="Edit account" use:enhance>
	<slot />
	<Field label="New Password" errors={fieldErrors.password}>
		<input type="text" name="password" bind:value={password} />
	</Field>
	<Field label="Confirm New Password" errors={fieldErrors.confirmPassword}>
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

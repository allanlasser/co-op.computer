<script lang="ts">
	import { isArray, isRecord } from '@/lib/utils/types';
	import Field from '../ui/Field.svelte';
	import Flash from '../ui/Flash.svelte';
	import Toast from '../ui/Toast.svelte';

	export let errors: string[] | Record<string, string[]> = {};

	$: formErrors = isArray(errors) ? errors : null;
	$: fieldErrors = isRecord(errors) ? errors : null;

	let email = '';
	let password = '';
</script>

{#if formErrors}
	<Flash>
		<Toast type="error">
			<p>{formErrors.join(', ')}</p>
		</Toast>
	</Flash>
{/if}
<form action="/account/signin" method="POST">
	<Field label="Email" errors={fieldErrors?.username}>
		<input type="email" name="email" bind:value={email} />
	</Field>
	<Field label="Password" errors={fieldErrors?.password}>
		<input type="password" name="password" bind:value={password} />
		<p slot="help"><a href="/account/password/forgot">Forgot your password?</a></p>
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

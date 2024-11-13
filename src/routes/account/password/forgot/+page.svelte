<script lang="ts">
	import { enhance } from '$app/forms';
	import Card from '@/lib/components/ui/Card.svelte';
	import Field from '@/lib/components/ui/Field.svelte';
	import Flash from '@/lib/components/ui/Flash.svelte';
	import Toast from '@/lib/components/ui/Toast.svelte';
	import { getErrors } from '@/lib/utils/forms';
	import { isArray } from '@/lib/utils/types';

	export let form;

	$: formErrors = isArray(form?.errors) ? form.errors : null;
	$: fieldErrors = getErrors(form?.errors);

	let email = '';
</script>

{#if form?.success}
	<Flash>
		<Toast type="success">
			<p>A password reset link has been sent to your email.</p>
		</Toast>
	</Flash>
{/if}
<div class="page">
	<header>
		<h1>Forgot Your Password?</h1>
		<p>
			Enter the email associated with your account. We will send you a link to reset your password.
		</p>
	</header>
	<div class="row">
		<Card>
			{#if formErrors}
				<Flash>
					<Toast type="error">
						<p>{formErrors.join(', ')}</p>
					</Toast>
				</Flash>
			{/if}
			<form action="/account/password/forgot" method="POST" class="column" use:enhance>
				<Field label="Email" errors={fieldErrors?.email}>
					<input required type="email" name="email" bind:value={email} />
				</Field>
				<button type="submit">Reset Password</button>
			</form>
		</Card>
	</div>
</div>

<style>
	header {
		margin-bottom: 1rem;
	}
	header h1 {
		font-size: var(--font-xl);
		font-weight: var(--font-semi);
		margin-bottom: 0.5rem;
	}
	header p {
		font-size: var(--font-sm);
		color: var(--gray-5);
	}
	button {
		align-self: flex-start;
	}
</style>

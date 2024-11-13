<script lang="ts">
	import SignInForm from '$lib/components/forms/SignIn.svelte';
	import Flash from '@/lib/components/ui/Flash.svelte';
	import { getErrors } from '@/lib/utils/forms';
	import { isArray, isRecord } from '@/lib/utils/types';

	export let form;
</script>

<div class="card">
	<header>
		<h1>Sign In</h1>
		<p>Need an account? <a href="/account/new">Sign Up</a></p>
	</header>
	{#if form?.errors && isArray(form.errors)}
		<Flash>
			<div class="error">
				<p>{form.errors.join(', ')}</p>
			</div>
		</Flash>
	{/if}
	<SignInForm errors={getErrors(form?.errors)} />
</div>

<style>
	.card {
		width: 100%;
		max-width: 32rem;
		margin: 0 auto;
	}
	.error {
		padding: 1rem;
		background: var(--red-1);
		color: var(--red-5);
	}
	.error p {
		text-align: center;
		max-width: 32rem;
		margin: 0 auto;
	}
	header {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		justify-content: space-between;
		align-items: baseline;
	}
</style>

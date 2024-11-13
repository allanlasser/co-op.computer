<script lang="ts">
	import SignInForm from '$lib/components/forms/SignIn.svelte';
	import Card from '@/lib/components/ui/Card.svelte';

	export let form;
</script>

<div class="page">
	<header>
		<h1>Sign In</h1>
		<div class="column sm">
			<p>Need an account? <a href="/account/new">Sign Up</a></p>
		</div>
	</header>
	<Card>
		<SignInForm errors={form?.errors} />
	</Card>
</div>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 1rem;
	}
	h1 {
		flex: 1 1 auto;
	}
	.column {
		flex: 0 0 auto;
		gap: calc(0.5 * var(--unit));
	}
</style>

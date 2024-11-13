<script lang="ts">
	import NewAccountForm from '@/lib/components/forms/NewAccount.svelte';
	import Card from '@/lib/components/ui/Card.svelte';
	import { getErrors } from '@/lib/utils/forms';

	export let data;
	export let form;
</script>

<div class="page">
	<header>
		<h1>Sign Up</h1>
		<p class="sm">Already have an account? <a href="/account/signin">Sign In</a></p>
	</header>
	<Card>
		<NewAccountForm invitation={data.invitation} errors={getErrors(form?.errors)} />
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
</style>

<script lang="ts">
	import NewAccountForm from '@/lib/components/forms/NewAccount.svelte';
	import { getErrors } from '@/lib/utils/forms';

	export let data;
	export let form;
</script>

<div class="card">
	<header>
		<h1>Sign Up</h1>
		<p>Already have an account? <a href="/account/signin">Sign In</a></p>
	</header>
	<NewAccountForm invitation={data.invitation} errors={getErrors(form?.errors)} />
</div>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		justify-content: space-between;
		align-items: baseline;
	}
	header p {
		font-size: var(--font-sm);
		font-weight: var(--font-semi);
		opacity: var(--o-70);
	}
</style>

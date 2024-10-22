<script lang="ts">
	export let data;

	$: user = data.session?.user;
</script>

<div class="page">
	{#if user}
		<div class="card">
			<h1>hello <a href="/account">{user.username}</a></h1>
			<ul>
				<li><a href="/tools">Find a Tool</a></li>
				<li><a href="/tools/new">Add a Tool</a></li>
				<li><a href="/groups/new">Start a Group</a></li>
			</ul>
		</div>
	{:else}
		<div class="card">
			<h1>hello world</h1>
			<div class="auth-buttons">
				<a class="button" href="/account/new">Sign Up</a>
				<a class="button" href="/account/signin">Sign In</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: flex-start;
		background: var(--background);
		width: 100%;
		padding: 2rem;
	}
	.card {
		align-items: center;
		padding: 4rem 2rem;
		gap: 2rem;
	}
	h1 {
		font-size: calc(2 * var(--font-xl));
	}
	ul {
		display: flex;
		gap: 1rem;
		padding: 0;
		margin: 2rem 0;
		list-style-type: none;
		font-size: var(--font-lg);
		font-weight: var(--font-bold);
	}
	.auth-buttons {
		display: inline-flex;
		gap: calc(2 * var(--unit));
	}
</style>

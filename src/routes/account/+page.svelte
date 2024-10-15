<script lang="ts">
	export let data;

	$: user = data.session.user;
</script>

<div class="page">
	<h2>Welcome back, {user.username}</h2>

	<h3>Your Tools</h3>
	{#await data.tools then results}
		<ul>
			{#each results as result}
				<li>
					<div class="tool">
						<h4>{result.tools.name}</h4>
						<p class="owner">{result.users.username}</p>
					</div>
				</li>
			{:else}
				<li>
					<p>You don't have any tools.</p>
					<p><a href="/tools/new">Start by adding one</a></p>
				</li>
			{/each}
		</ul>
	{:catch error}
		<p>Encountered an error while fetching your tools.</p>
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.page {
		width: 100%;
		height: 100%;
		background: var(--background);
		flex: 1 1 auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: var(--unit);
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		padding: 0;
		gap: calc(2 * var(--unit));
	}

	h2 {
		font-size: calc(1.25 * var(--font-xl));
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: var(--font-xl);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--gray-1);
	}

	h4 {
		font-size: var(--font-lg);
	}

	.owner {
		font-size: var(--font-sm);
	}
</style>

<script lang="ts">
	export let data;
</script>

<div class="tools">
	{#await data.tools}
		<p>Loading tools…</p>
	{:then results}
		<ul>
			{#each results as result}
				<li>
					<div class="tool">
						<h2>{result.tools.name}</h2>
						<p class="owner">{result.users.username}</p>
					</div>
				</li>
			{:else}
				<li>No tools found</li>
			{/each}
		</ul>
	{:catch}
		<p>Error loading tools!</p>
	{/await}
</div>

<style>
	.tools {
		margin: 2rem auto;
		max-width: 64rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}

	h2 {
		font-size: var(--font-lg);
	}

	.owner {
		font-size: var(--font-sm);
	}
</style>

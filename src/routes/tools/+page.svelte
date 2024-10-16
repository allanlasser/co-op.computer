<script lang="ts">
	import { getToolPath, shortenUUID } from '$lib/utils/routes';

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
						<h4><a href={getToolPath(result.tools)}>{result.tools.name}</a></h4>
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
		width: 100%;
		max-width: 64rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}

	h4 {
		font-size: var(--font-lg);
	}

	.owner {
		font-size: var(--font-sm);
	}
</style>

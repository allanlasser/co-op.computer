<script lang="ts">
	import { getToolPath } from '$lib/utils/routes';

	export let data;
</script>

<div class="page">
	<div class="card">
		<header>
			<h1>Search Tools</h1>
		</header>
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
</div>

<style>
	h1 {
		font-size: var(--font-xl);
	}
	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
		padding: 0;
	}

	h4 {
		font-size: var(--font-lg);
	}

	.owner {
		font-size: var(--font-sm);
	}
</style>

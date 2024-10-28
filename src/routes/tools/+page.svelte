<script lang="ts">
	import ToolListItem from '@/lib/components/tools/ToolListItem.svelte';

	export let data;
</script>

<div class="page">
	<div class="card">
		<header>
			<h1>Available Tools</h1>
		</header>
		{#await data.tools}
			<p>Loading tools…</p>
		{:then results}
			<ul>
				{#each results as result}
					<li>
						<ToolListItem
							tool={result.tools}
							owner={result.users}
							isOwner={result.users.id === data.session.user.id}
						/>
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
</style>

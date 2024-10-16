<script lang="ts">
	import { getToolPath } from '$lib/utils/routes';

	export let data;

	$: tool = data.tool;
	$: user = data.session?.user;
	$: isOwner = tool.ownerId === user?.id;
</script>

<div class="page">
	<header>
		<h2>{tool.name}</h2>
		{#if isOwner}
			<div class="actions">
				<a href="{getToolPath(tool)}/edit" class="button">Edit</a>
			</div>
		{/if}
	</header>
</div>

<style>
	header,
	.actions {
		display: flex;
		gap: var(--unit);
	}
	h2 {
		flex: 1 1 auto;
	}
</style>

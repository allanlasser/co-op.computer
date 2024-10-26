<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Tool, User } from '$lib/db/schema';
	import { getToolPath } from '../../utils/routes';
	import type { Maybe } from '../../utils/types';

	export let tool: Tool;
	export let owner: Maybe<User> = undefined;
	export let isOwner: boolean = false;
</script>

<div class="tool row">
	<div class="details">
		<h4 class="name"><a href={getToolPath(tool)}>{tool.name}</a></h4>
		{#if owner}<p class="owner">{owner.username}</p>{/if}
	</div>
	<div class="actions row">
		{#if isOwner}
			<a class="edit" href="{getToolPath(tool)}/edit">Edit</a>
		{:else}
			<form method="POST" action="{getToolPath(tool)}?/request" use:enhance>
				<button disabled type="submit">Request</button>
			</form>
		{/if}
	</div>
</div>

<style>
	.tool {
		width: 100%;
		min-width: 12rem;
		padding: var(--unit) 0;
		border-radius: var(--br-2);
		align-items: center;
	}

	.name {
		font-size: var(--font-lg);
		font-weight: var(--font-semi);
	}

	.owner {
		font-size: var(--font-sm);
		opacity: 0.7;
	}

	.actions a {
		font-size: var(--font-sm);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--unit);
	}

	.details {
		flex: 1 1 auto;
	}
</style>

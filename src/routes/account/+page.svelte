<script lang="ts">
	import { getGroupPath, getToolPath } from '$lib/utils/routes';
	import ToolListItem from '@/lib/components/tools/ToolListItem.svelte';
	import Card from '@/lib/components/ui/Card.svelte';
	import { PlusSquare } from 'lucide-svelte';
	import ShieldAlert from 'lucide-svelte/icons/shield-alert';

	export let data;

	$: user = data.session.user;
	$: isVerified = data.isVerified;
</script>

<div class="account page">
	<header>
		<h2>Welcome back, <a href="/users/{user.username}">{user.username}</a></h2>
		<div class="row">
			<a href="/account/settings">Settings</a>
			<a data-sveltekit-preload-data="tap" href="/account/signout">Sign Out</a>
		</div>
	</header>
	{#if !isVerified}
		<div class="card tip row align-center">
			<ShieldAlert />
			<p>Your email, {user.email}, is not verified.</p>
			<form method="POST" action="/account/verification">
				<button type="submit">Verify My Email</button>
			</form>
		</div>
	{/if}
	<div class="row">
		<Card title="Your Tools">
			<a class="action" slot="action" href="/tools/new">
				<PlusSquare size={14} strokeWidth={2.5} /> New Tool
			</a>
			{#await data.tools then results}
				<ul>
					{#each results as { tools: tool, users: owner } (tool.id)}
						<li>
							<ToolListItem {tool} isOwner />
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
		</Card>

		<Card title="Your Groups">
			<a class="action" slot="action" href="/groups/new">
				<PlusSquare size={14} strokeWidth={2.5} />
				New Group
			</a>
			{#await data.groups then groups}
				<ul>
					{#each groups as group}
						<li>
							<div class="tool">
								<h4><a href={getGroupPath(group)}>{group.name}</a></h4>
							</div>
						</li>
					{:else}
						<li>
							<p>You don't belong to any groups.</p>
							<p><a href="/groups/new">Start your own</a></p>
						</li>
					{/each}
				</ul>
			{:catch error}
				<p>Encountered an error while fetching your groups.</p>
				<p>{error.message}</p>
			{/await}
		</Card>
	</div>
</div>

<style>
	.action {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
	}
	.account {
		width: 100%;
		height: 100%;
		background: var(--background);
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		gap: calc(1 * var(--unit));
	}

	.row {
		display: flex;
		gap: calc(4 * var(--unit));
	}

	.align-center {
		align-items: center;
	}

	.tip {
		flex-flow: row nowrap;
		margin: var(--unit) 0;
		padding: var(--unit);
		font-weight: var(--font-semi);
	}
	.tip p {
		flex: 1 1 auto;
	}

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 2rem 0;
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		padding: 0;
		gap: calc(var(--unit));
	}

	h2 {
		font-size: calc(1.25 * var(--font-xl));
		font-weight: var(--font-semi);
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
</style>

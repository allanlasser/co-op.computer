<script lang="ts">
	import { shortenUUID } from '$lib/utils/routes';

	export let data;

	$: user = data.session?.user;
	$: group = data.group;
</script>

<div class="page">
	<div class="card">
		<header>
			<h2>{group.name}</h2>
		</header>
		<div class="row">
			<div class="column">
				<header>
					<h3>Members</h3>
					<a class="action" href="/invitations/new?toGroup={group.id}">Invite Member</a>
				</header>
				{#await data.members then members}
					{#each members as member (member.id)}
						<li class="row">
							<h4>{member.username}</h4>
							{#if member.id === user?.id}<span class="badge">You</span>{/if}
						</li>
					{/each}
				{/await}
			</div>
			<div class="column">
				<header>
					<h3>Invitations</h3>
					<a class="action" href="/invitations/preview?toGroup={group.id}">Preview</a>
				</header>
				{#await data.invitations then invitations}
					{#each invitations as invitation (invitation.id)}
						<li class="invitation row">
							<h4>{invitation.toEmail}</h4>
						</li>
					{/each}
				{/await}
			</div>
		</div>
	</div>
</div>

<style>
	header {
		padding-bottom: calc(2 * var(--unit));
		margin-bottom: var(--unit);
		border-bottom: 2px solid var(--gray-1);
	}
	h2 {
		flex: 1 1 100%;
		text-align: center;
	}
	h3,
	h4 {
		font-weight: var(--font-semi);
	}
	.row {
		display: flex;
		align-items: baseline;
		gap: calc(4 * var(--unit));
	}
	.column {
		flex: 1 1 12rem;
		display: flex;
		flex-direction: column;
	}
	.column header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--unit);
		margin-bottom: var(--unit);
		padding-bottom: var(--unit);
		border-bottom: 1px solid var(--gray-1);
	}
	.badge {
		font-size: var(--font-xs);
		font-weight: var(--font-semi);
		outline: 1px solid;
		padding: 0.125rem 0.25rem;
		border-radius: var(--br-2);
	}
	.action {
		font-size: var(--font-sm);
	}
</style>

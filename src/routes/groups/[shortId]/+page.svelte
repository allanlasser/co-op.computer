<script lang="ts">
	import { enhance } from '$app/forms';
	import { getGroupPath, getInvitationPath, getToolPath } from '$lib/utils/routes';

	export let data;

	$: user = data.user;
	$: group = data.group;
</script>

<div class="page">
	<div class="card">
		<header class="row">
			<h2>{group.name}</h2>
			<div class="actions row">
				<a class="button" href="{getGroupPath(group)}/edit">Edit</a>
			</div>
		</header>
		<div class="column">
			<header>
				<h3>Members</h3>
				<a class="action" href="/invitations/new?toGroup={group.id}">Invite Member</a>
			</header>
			{#await data.members then members}
				{#each members as member (member.id)}
					<li class="row">
						<h4 class="username">{member.username}</h4>
						{#if member.id === user?.id}<span class="badge">You</span>{/if}
					</li>
				{/each}
			{/await}
		</div>
		<div class="column">
			<header>
				<h3>Invitations</h3>
			</header>
			{#await data.invitations then invitations}
				{#each invitations as invitation (invitation.id)}
					<li class="invitation row">
						<h4>{invitation.toEmail}</h4>
						{#if user.id === invitation.fromUserId}
							<div class="actions row">
								<form method="POST" action="{getInvitationPath(invitation)}?/resend" use:enhance>
									<button type="submit">Resend</button>
								</form>
								<form method="POST" action="{getInvitationPath(invitation)}?/revoke" use:enhance>
									<button class="danger" type="submit">Revoke</button>
								</form>
							</div>
						{/if}
					</li>
				{/each}
			{/await}
		</div>
		<div class="column">
			<header>
				<h3>Tools</h3>
				<a class="action" href="/tools/new">Add Tool</a>
			</header>
			{#await data.tools then tools}
				{#each tools as { tools: tool, users: user } (tool.id)}
					<li class="tool row">
						<div class="details">
							<h4><a href={getToolPath(tool)}>{tool.name}</a></h4>
							<p class="owner">{user.username}</p>
						</div>
						{#if user.id === tool.ownerId}
							<div class="actions row">
								<form method="POST" action="{getToolPath(tool)}?/request" use:enhance>
									<button type="submit">Request</button>
								</form>
							</div>
						{/if}
					</li>
				{/each}
			{/await}
		</div>
	</div>
</div>

<style>
	header {
		padding-bottom: calc(2 * var(--unit));
		margin-bottom: calc(2 * var(--unit));
		border-bottom: 2px solid var(--gray-1);
	}

	.card {
		gap: calc(4 * var(--unit));
	}
	h2 {
		flex: 1 1 100%;
		font-size: calc(1.5 * var(--font-xl));
		font-weight: var(--font-semi);
	}
	h3,
	h4 {
		font-weight: var(--font-semi);
		flex: 1 1 auto;
	}
	li {
		margin-bottom: 0.5rem;
	}
	.row {
		display: flex;
		align-items: baseline;
		gap: calc(var(--unit));
	}
	.column {
		flex: 1 1 auto;
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
	.username {
		flex: 0 1 auto;
	}
	.details {
		flex: 1 1 auto;
	}
	.tool {
		padding: var(--unit);
		border-radius: var(--br-2);
		align-items: center;
		&:hover {
			background: #efefef;
		}
	}
</style>

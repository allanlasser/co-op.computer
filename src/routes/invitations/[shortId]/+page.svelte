<!-- You've been invited to join X group -->
<!-- If signed out: sign in + redirect back here
  or create an account and pass through the invitation code -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getGroupPath } from '$lib/utils/routes';

	export let data;
	export let form;

	$: user = data.session?.user;
	$: invitation = data.invitations;
	$: toGroup = data.groups;
	$: fromUser = data.users;

	$: if (form?.success) {
		goto(getGroupPath(toGroup));
	}
</script>

<div class="page">
	<div class="info card">
		<div class="body">
			<p>
				Your friend <span class="fromUser semi">{fromUser.username}</span> has invited you to join
				their group <span class="toGroup semi">{toGroup.name}</span>{#if !user}&nbsp;on
					<span class="co-op semi">CO-OP</span>, a decentralized property sharing system{/if}.
			</p>
		</div>
		{#if user}
			<div class="actions">
				<form method="POST" action="?/accept" use:enhance>
					<button type="submit">Accept Invitation</button>
				</form>
			</div>
		{/if}
	</div>
	{#if !user}
		<div class="accept card">
			<div class="row">
				<p>
					To accept this invitation,<br />you'll need a <span class="co-op">CO-OP</span> account:
				</p>
				<div class="actions">
					<a class="button" href="/account/new?invitation={invitation.id}">Sign Up</a>
					<a class="button" href="/account/signin?then={encodeURIComponent($page.url.pathname)}">
						Sign In
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		margin: 0 auto;
		max-width: 15rem;
		font-size: var(--font-lg);
	}
	.co-op {
		font-weight: var(--font-semi);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		align-items: center;
	}
	.actions {
		flex: 1 1 auto;
		display: flex;
		justify-content: center;
		width: auto;
		gap: 1rem;
	}
	.card {
		max-width: 32rem;
		margin: 0 auto;
	}
	.accept {
		justify-content: center;
		text-align: center;
	}
	.accept p {
		text-align: left;
		font-size: var(--font-lg);
		line-height: 1.4;
	}
	.info {
		padding: 4rem 2rem;
		gap: 2rem;
		text-align: center;
	}
	.body p {
		flex: 1 1 auto;
		max-width: 19rem;
		margin: 0 auto 1.25em;
		line-height: 2;
	}
	.body p:last-child {
		margin-bottom: 0;
	}
	.fromUser {
		color: teal;
		box-shadow: 0 2px teal;
	}
	.toGroup {
		color: indigo;
		box-shadow: 0 2px indigo;
	}
	.semi {
		font-weight: var(--font-semi);
	}
</style>

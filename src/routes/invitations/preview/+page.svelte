<!-- You've been invited to join X group -->
<!-- If signed out: sign in + redirect back here
  or create an account and pass through the invitation code -->
<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	$: user = data.session?.user;
	$: toGroup = data.group;
	$: fromUser = user;

	let existingUser = true;
</script>

<div class="page">
	<div class="info card">
		<div class="body">
			<p>
				Your friend <span class="fromUser semi">{fromUser.username}</span> has invited you to join
				their group <span class="toGroup semi">{toGroup.name}</span>{#if !existingUser}&nbsp;on
					<span class="co-op semi">CO-OP</span>, a decentralized property sharing system{/if}.
			</p>
		</div>
		{#if existingUser}
			<div class="actions">
				<form method="POST">
					<button type="submit">Accept Invitation</button>
				</form>
			</div>
		{/if}
	</div>
	{#if !existingUser}
		<div class="accept card">
			<div class="row">
				<p>
					To accept this invitation,<br />you'll need a <span class="co-op">CO-OP</span> account:
				</p>
				<div class="actions">
					<a class="button" href="/account/new">Sign Up</a>
					<a class="button" href="/account/signin"> Sign In </a>
				</div>
			</div>
		</div>
	{/if}
	<div>
		<label>
			Show as Authenticated
			<input type="checkbox" bind:checked={existingUser} />
		</label>
	</div>
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
		/* font-size: var(--font-sm); */
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

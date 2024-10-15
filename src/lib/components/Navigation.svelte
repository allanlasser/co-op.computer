<script lang="ts">
	import type { User } from '$lib/db/schema';
	import type { Maybe } from '$lib/utils/types';

	export let user: Maybe<User> = undefined;
</script>

<nav>
	<a class="home" href="/">
		<h1>commonplace.tools</h1>
		<p>distributed toolshare library</p>
	</a>

	<ul>
		<li><a href="/tools">Find Tool</a></li>
		<li><a href="/tools/new">Contribute</a></li>
	</ul>

	<div class="account">
		{#if user}
			<div class="flex">
				<p><a href="/account">{user.username}</a></p>
				<a class="button" href="/account/signout" data-sveltekit-reload>Sign Out</a>
			</div>
		{:else}
			<div class="flex">
				<a class="button" href="/account/signin">Sign In</a>
				<a class="button" href="/account/create">Sign Up</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	.flex {
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: calc(3 * var(--unit));
		padding: var(--unit) calc(2 * var(--unit));
		border-bottom: 1px solid var(--gray-1);
	}
	nav a {
		text-decoration: none;
	}
	nav ul {
		flex: 1 1 auto;
		display: inline-flex;
		gap: calc(3 * var(--unit));
		align-items: baseline;
		list-style-type: none;
	}
	nav ul li a {
		font-weight: var(--font-semi);
	}
	.home {
		color: inherit;
		text-decoration: none;
		&:hover,
		&:focus {
			color: var(--green-3);
		}
	}
	.home h1 {
		font-size: var(--font-lg);
	}
	.home p {
		font-size: var(--font-xs);
		opacity: var(--o-70);
	}
	.account {
		display: flex;
		align-items: baseline;
		gap: var(--unit);
		font-size: var(--font-md);
		font-weight: var(--font-semi);
	}
</style>

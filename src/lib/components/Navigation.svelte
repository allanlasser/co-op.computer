<script lang="ts">
	import type { User } from '$lib/db/schema';
	import type { Maybe } from '$lib/utils/types';

	export let user: Maybe<User> = undefined;
</script>

<nav>
	<a class="home" href="/">
		<h1>co<span class="hyphen">-</span>op</h1>
		<p>.computer</p>
	</a>
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
		flex: 0 1 auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: calc(3 * var(--unit));
		padding: var(--unit) calc(2 * var(--unit));
		/* border-right: 2px solid var(--gray-1); */
	}
	nav a {
		text-decoration: none;
	}
	.home {
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border-radius: var(--br-3);
		border: 2px solid transparent;
		&:hover,
		&:focus {
			border: 2px solid var(--gray-2);
			box-shadow: 0 2px 0 var(--gray-2);
		}
		&:active {
			transform: translateY(2px);
			box-shadow: none;
		}
	}
	.home h1 {
		font-size: var(--font-xl);
		font-weight: var(--font-bold);
		text-transform: uppercase;
	}
	.home p {
		font-size: var(--font-xs);
		font-weight: var(--font-semi);
		opacity: var(--o-70);
	}
	.account {
		display: flex;
		align-items: baseline;
		gap: var(--unit);
		font-size: var(--font-md);
		font-weight: var(--font-semi);
	}
	.hyphen {
		display: inline-block;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: user = data.session?.user;
</script>

<div class="page">
	<nav>
		<a class="home" href="/">
			<h1>commonplace.tools</h1>
			<p>distributed tool sharing</p>
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
	<main>
		{#await data.tools then tools}
			<ul>
				{#each tools as tool}
					<li>{tool.name}</li>
				{:else}
					<li>No tools found</li>
				{/each}
			</ul>
		{/await}

		<form method="POST" action="?/create" use:enhance>
			<label>
				Tool Name
				<input name="name" type="name" />
			</label>
			<button>Add tool</button>
		</form>
		{#if form?.success}
			<p>Tool added!</p>
		{/if}
	</main>
</div>

<style>
	.page {
		background: var(--background);
		width: 100%;
	}
	.flex {
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}
	main {
		margin: 2rem;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--unit) calc(2 * var(--unit));
		border-bottom: 1px solid var(--gray-1);
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
	}
</style>

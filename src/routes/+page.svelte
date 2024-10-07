<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: user = data.session?.user;
</script>

<h1>commonplace.tools</h1>
<p>distributed tool sharing</p>

{#if user}
	<div class="flex">
		<p>hi {user.username}</p>
		<a class="button" href="/account/signout" data-sveltekit-reload>Sign Out</a>
	</div>
{:else}
	<div class="flex">
		<a class="button" href="/account/signin">Sign In</a>
		<a class="button" href="/account/create">Sign Up</a>
	</div>
{/if}

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

<style>
	.flex {
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}
</style>

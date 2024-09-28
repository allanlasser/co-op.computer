<script lang="ts">
	import { enhance } from '$app/forms';
	import { signIn } from '@auth/sveltekit/client';

	export let data;
	export let form;
</script>

<h1>commonplace.tools</h1>
<p>distributed tool sharing</p>

{#await data.tools then tools}
	<ul>
		{#each tools as tool}
			<li>{tool.name}</li>
		{:else}
			<li>No tools found</li>
		{/each}
	</ul>
{/await}

<button on:click={() => signIn()}>Sign In (Client)</button>

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

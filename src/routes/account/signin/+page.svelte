<script lang="ts">
	export let form;

	let email = '';
	let password = '';
</script>

<form method="POST">
	<label>
		Email
		<input type="email" name="email" bind:value={email} />
	</label>
	<label>
		Password
		<input type="password" name="password" bind:value={password} />
	</label>
	<button type="submit">Sign In</button>
</form>
{#if form?.errors}
	{JSON.stringify(form.errors, null, 2)}
{/if}

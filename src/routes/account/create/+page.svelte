<script lang="ts">
	export let form;

	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
</script>

<h1>Create an account</h1>
<form method="POST" aria-label="Create account">
	<label>
		Email
		<input type="email" name="email" bind:value={email} />
	</label>
	<label>
		Username
		<input type="text" name="username" bind:value={username} />
		<p class="help">Your username will be used in your profile URL:</p>
		<p class="help">commonplace.tools/users/{username}</p>
	</label>
	<label>
		Password
		<input type="text" name="password" bind:value={password} />
	</label>
	<label>
		Confirm Password
		<input type="text" name="confirmPassword" bind:value={confirmPassword} />
	</label>
	<button type="submit">Sign Up</button>
</form>
{#if form?.errors}
	{JSON.stringify(form.errors, null, 2)}
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
	.help {
		margin: 0;
	}
</style>

<script lang="ts">
	export let form;

	let email = '';
	let password = '';
</script>

<div class="card">
	<header>
		<h1>Sign In</h1>
		<p>Need an account? <a href="/account/new">Sign Up</a></p>
	</header>
	{#if form?.errors}
		{JSON.stringify(form.errors, null, 2)}
	{/if}
	<form method="POST">
		<label>
			Email
			<input type="email" name="email" bind:value={email} />
		</label>
		<label>
			Password
			<input type="password" name="password" bind:value={password} />
		</label>
		<footer>
			<button type="submit">Sign In</button>
		</footer>
	</form>
</div>

<style>
	.card {
		width: 100%;
		max-width: 32rem;
		margin: 0 auto;
	}
	header {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		justify-content: space-between;
		align-items: baseline;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}
</style>

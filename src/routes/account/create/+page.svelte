<script lang="ts">
	export let form;

	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
</script>

<div class="card">
	<header>
		<h1>Sign Up</h1>
		<p>Already have an account? <a href="/account/signin">Sign In</a></p>
	</header>
	<div class="errors">
		{#if form?.errors}
			{JSON.stringify(form.errors, null, 2)}
		{/if}
	</div>
	<form method="POST" aria-label="Create account">
		<div class="column">
			<label>
				Email
				<input type="email" name="email" bind:value={email} />
			</label>
			<label>
				Username
				<input type="text" name="username" bind:value={username} />
				<div class="username-help">
					<p>Your username will be used in your profile URL:</p>
					<p>commonplace.tools/users/{username}</p>
				</div>
			</label>
		</div>
		<div class="column">
			<label>
				Password
				<input type="text" name="password" bind:value={password} />
			</label>
			<label>
				Confirm Password
				<input type="text" name="confirmPassword" bind:value={confirmPassword} />
			</label>
		</div>
		<footer>
			<button type="submit">Sign Up</button>
		</footer>
	</form>
</div>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
		justify-content: space-between;
		align-items: baseline;
	}
	header p {
		font-size: var(--font-sm);
		font-weight: var(--font-semi);
		opacity: var(--o-70);
	}
	form {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
	}
	.column {
		flex: 1 1 16rem;
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}
	footer {
		flex: 1 1 100%;
	}
	.username-help {
		font-family: var(--font-mono);
		font-size: var(--font-xs);
		line-height: 1.5;
		opacity: var(--o-70);
		& p {
			margin: 0;
		}
	}
</style>

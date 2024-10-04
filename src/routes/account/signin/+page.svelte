<script lang="ts">
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

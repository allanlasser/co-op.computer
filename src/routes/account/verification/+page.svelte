<script lang="ts">
	export let data;
	export let form;
</script>

<div class="page">
	{#if data.isVerified}
		<div class="card">
			<header>
				<h2>Your email is verified</h2>
				<p>You can now create groups and invite others to join them.</p>
			</header>
			<div class="row justify-center gap-2">
				<a href="/">Home</a>
				<a href="/account">Account</a>
			</div>
		</div>
	{:else}
		<div class="card">
			<header>
				<h2>Verify your account email</h2>
				<p>Your email must be verified to create groups and invite members.</p>
			</header>
			{#if form?.success}
				<p class="success">{form.message}</p>
			{:else}
				{#if form?.errors}
					<p class="error">
						{JSON.stringify(form.errors, null, 2)}
					</p>
				{/if}
				<form method="POST">
					<button type="submit">Send Link</button>
				</form>
			{/if}
		</div>
	{/if}
</div>

<style>
	.card {
		text-align: center;
	}
	h2 {
		margin-bottom: var(--unit);
		font-weight: var(--font-semi);
	}
	header p {
		opacity: var(--o-70);
	}
	.success {
		padding: var(--unit);
		background: mintcream;
		color: forestgreen;
		font-weight: var(--font-semi);
		border-radius: var(--br-3);
	}
	.row {
		display: flex;
	}
	.justify-center {
		justify-content: center;
	}
	.gap-2 {
		gap: calc(2 * var(--unit));
	}
</style>

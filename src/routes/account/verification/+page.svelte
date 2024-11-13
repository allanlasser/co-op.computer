<script lang="ts">
	import Flash from '@/lib/components/ui/Flash.svelte';
	import Toast from '@/lib/components/ui/Toast.svelte';

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
				<Flash>
					<Toast type="success">
						<p>{form?.message}</p>
					</Toast>
				</Flash>
			{:else}
				{#if form?.errors}
					<Toast type="error">
						<p>{form.errors.join(', ')}</p>
					</Toast>
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
		position: relative;
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

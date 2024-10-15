<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="layout centered">
	{#if $page.status}
		<h1>{$page.status}</h1>
	{/if}
	{#if $page.error}
		<p class="message">{$page.error.message}</p>
	{/if}
	<a href="/">Return Home</a>
</div>

<style>
	.layout {
		min-width: 100%;
		min-height: 100%;
	}
	.centered {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--unit);
	}
	.message {
		font-size: var(--font-lg);
		font-weight: var(--font-semi);
	}
</style>

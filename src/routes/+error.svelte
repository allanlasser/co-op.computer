<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="page fullscreen centered">
	{#if $page.status}
		<h1>{$page.status}</h1>
	{/if}
	{#if $page.error}
		<p class="message">{$page.error.message}</p>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		font-size: 4rem;
		color: var(--foreground);
		-webkit-text-stroke: 0.09375rem;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-color: var(--foreground);
		opacity: 0.8;
	}
	.message {
		font-weight: var(--font-semi);
		opacity: 0.9;
	}
</style>

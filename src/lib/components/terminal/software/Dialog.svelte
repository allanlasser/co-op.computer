<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';

	export let hideClose = false;

	const dispatch = createEventDispatcher();

	function closeDialog() {
		dispatch('close');
	}
</script>

<div class="terminal dialog">
	<slot />
	{#if !hideClose}
		<button on:click={closeDialog} class="close"><X /></button>
	{/if}
</div>

<style>
	.dialog {
		max-width: 32rem;
		margin: 0 auto;
		display: inline-flex;
		padding: 3rem;
		flex-direction: column;
		justify-content: center;
		gap: 0.75rem;
		position: relative;
		text-align: left;

		border-top: 12px solid var(--terminal-stroke-color);
		border-right: 2px solid var(--terminal-stroke-color);
		border-bottom: 2px solid var(--terminal-stroke-color);
		border-left: 2px solid var(--terminal-stroke-color);
	}

	.close {
		display: flex;
		align-items: center;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		right: 0.75rem;
		top: 0.75rem;
		border: none;
		border-radius: 0px;
		color: currentColor;
		background: var(--terminal-background);
		cursor: pointer;
		&:hover,
		&:focus {
			background: var(--terminal-fill-color);
		}
		&:focus {
			outline: 2px solid currentColor;
		}
		&:active {
			color: var(--terminal-inverted-color);
			background: var(--terminal-inverted-background);
			border: none;
		}
	}
</style>

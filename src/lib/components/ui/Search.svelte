<script lang="ts">
	import type { Nullable } from '$lib/utils/types';
	import { AlertTriangle, Loader, Search } from 'lucide-svelte';

	export let query: string = '';
	export let loading = false;
	export let error: Nullable<string> = null;
</script>

<div class="input">
	{#if loading}
		<div class="spin icon">
			<Loader size="20" />
		</div>
	{:else if error}
		<div class="error icon" title={error}>
			<AlertTriangle size="20" />
		</div>
	{:else}
		<div class="icon">
			<Search size="20" />
		</div>
	{/if}
	<input
		type="search"
		bind:value={query}
		placeholder="What do you need?"
		on:change
		on:reset
		on:keyup
	/>
</div>

<style>
	.input {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0;
		padding: 0 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		background: white;
	}

	.input input {
		width: 100%;
		border: none;
		outline: none;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gray-5);
	}

	.error {
		color: var(--red-3);
	}
</style>

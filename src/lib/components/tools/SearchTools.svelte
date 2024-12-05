<script lang="ts">
	import type { Tool, User, UsersToGroups } from '@/lib/db/schema';
	import Search from '../ui/Search.svelte';
	import { Loader } from 'lucide-svelte';
	import { debounce } from '@/lib/utils/debounce';
	import type { Nullable } from '@/lib/utils/types';
	import ToolListItem from './ToolListItem.svelte';
	import { flip } from 'svelte/animate';

	interface SearchToolsResponse {
		tools: Tool;
		users: User;
	}

	let query: string = '';
	let error: Nullable<string> = null;
	let loading: boolean = false;

	let promise: Promise<SearchToolsResponse[]>;

	const endpoint = (query: string) => `/api/tools/search?query=${encodeURIComponent(query)}`;

	async function searchTools(query: string) {
		loading = true;
		error = null;
		let data: SearchToolsResponse[] = [];
		if (!query.trim()) return [];
		try {
			const resp = await fetch(endpoint(query));
			if (!resp.ok) throw new Error(resp.statusText);
			data = await resp.json();
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		}
		loading = false;
		return data;
	}

	const debouncedSearch = debounce((value: string) => {
		promise = searchTools(value);
	}, 300);

	$: if (query) debouncedSearch(query);
</script>

<div class="container">
	<Search bind:query {loading} {error} />
	{#await promise}
		<div class="loading card centered">
			<div class="spin"><Loader size="20" /></div>
			<p>Searching…</p>
		</div>
	{:then data}
		{#if error}
			<p style="color: red;">{error}</p>
		{:else if query && data?.length}
			<ul class="card">
				{#each data as { tools: tool, users: owner } (tool.id)}
					<li animate:flip>
						<ToolListItem {tool} {owner} />
					</li>
				{/each}
			</ul>
		{:else if query}
			<p class="empty card centered">No tools found.</p>
		{/if}
	{/await}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		gap: 1rem;
	}
	.loading,
	.empty {
		flex-direction: row;
		gap: 1rem;
		color: var(--gray-5);
	}
	ul {
		list-style-type: none;
	}
</style>

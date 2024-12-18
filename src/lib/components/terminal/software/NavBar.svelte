<script lang="ts">
	import { HandshakeIcon, NotebookIcon, Search, WaypointsIcon } from 'lucide-svelte';

	export let searchQuery = '';
	export let route: string | null;

	let searchInput: HTMLInputElement;

	$: activeTab = [...Object.values(tabs).map((tab) => tab.url), '/search'].find(
		(tab) => tab === route
	);

	const tabs: Record<string, { icon: any; label: string; url: string }> = {
		groups: { icon: WaypointsIcon, label: 'Groups', url: '/groups' },
		loans: { icon: HandshakeIcon, label: 'Loans', url: '/loans' },
		catalog: { icon: NotebookIcon, label: 'Catalog', url: '/catalog' }
	};
</script>

<div class="navbar">
	<form method="GET" action="/search" class="search-form">
		<label for="search" class="search-field" class:active={activeTab === '/search'}>
			<Search />
			<input id="search" type="text" placeholder="Search" bind:value={searchQuery} />
		</label>
	</form>
	<ul class="tabs">
		{#each Object.entries(tabs) as [tab, { icon, label, url }]}
			<li class="tab" class:active={url === activeTab}>
				<a href={url}>
					<svelte:component this={icon} />
					<span class="label">{label}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		gap: 0;
		height: 100%;
	}

	.search-form {
		flex: 1;
	}

	.search-field {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 1em;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid var(--terminal-stroke-color);
		cursor: pointer;
		&:focus-within,
		&:hover {
			background-color: var(--terminal-fill-color);
		}
		&.active {
			&:focus-within,
			&:hover {
				background-color: var(--terminal-inverted-background);
			}
			& input::placeholder {
				color: currentColor;
				opacity: 0.5;
			}
		}
	}

	.search-field input {
		flex: 1;
		appearance: none;
		font-family: var(--font-mono);
		font-size: 1em;
		font-weight: 500;
		line-height: 1.5;
		background: transparent;
		color: currentcolor;
		border: none;
		&::placeholder {
			color: currentColor;
			opacity: 0.5;
		}
		&:focus {
			outline: none;
			&::placeholder {
				color: currentColor;
				opacity: 0.5;
			}
		}
	}

	.tabs {
		list-style: none;
		display: flex;
		flex: 0;
		padding: 0;
		gap: 0;
	}

	.tab {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-bottom: 2px solid var(--terminal-stroke-color);
		&:hover {
			color: var(--terminal-color);
			background-color: var(--terminal-fill-color);
		}
		&:focus,
		&:focus-within {
			background-color: var(--terminal-stroke-color);
			outline: none;
		}
		&.active:hover {
			color: var(--terminal-inverted-color);
			background-color: var(--terminal-inverted-background);
		}
	}
	.tab a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		color: currentColor;
		padding: 0.375rem 1rem;
		text-decoration: none;
		&:hover,
		&:active,
		&:focus {
			background: transparent;
		}
	}

	.label {
		font-family: 'IBM Plex Mono';
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 600;
		line-height: 1.5rem; /* 171.429% */
		letter-spacing: 0.0875rem;
		text-transform: uppercase;
	}
	/* .label::first-letter {
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-decoration-skip-ink: auto;
		text-decoration-color: var(--terminal-stroke-color);
		text-decoration-thickness: 2px;
		text-underline-offset: 30%;
		text-underline-position: from-font;
	} */

	.active {
		position: relative;
		/* border-bottom-color: var(--terminal-inverted-stroke-color); */
		background-color: var(--terminal-inverted-background);
		color: var(--terminal-inverted-color);
		/* &::after {
			--height: 0.5em;
			content: '';
			position: absolute;
			height: var(--height);
			bottom: calc(-1 * var(--height));
			left: 0;
			right: 0;
			z-index: -1;
			background-color: var(--terminal-inverted-background);
		} */
	}
</style>

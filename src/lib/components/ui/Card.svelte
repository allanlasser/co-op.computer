<script lang="ts">
	export let title = '';
</script>

<div class="column">
	{#if title || $$slots.title || $$slots.action}
		<header>
			{#if title || $$slots.title}<slot name="title"><legend class="title">{title}</legend></slot
				>{/if}
			{#if $$slots.action}<div class="action"><slot name="action" /></div>{/if}
		</header>
	{/if}
	<div class="card">
		<slot />
	</div>
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
		gap: var(--unit);
		font-family: var(--font-mono);
		font-weight: var(--font-semi);
		font-size: var(--font-xs);
		text-transform: uppercase;
		letter-spacing: 0.125em;
	}
	.title {
		color: var(--gray-5);
	}
	.action {
		text-decoration: none;
	}
	header:empty,
	.title:empty,
	.action:empty {
		display: none;
	}
	.column {
		gap: calc(var(--unit));
	}
</style>

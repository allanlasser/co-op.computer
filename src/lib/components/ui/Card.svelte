<script lang="ts">
	export let title = '';
</script>

<div class="column">
	<slot name="title"><legend class="title">{title}</legend></slot>
	<div class="card column">
		<slot />
	</div>
</div>

<style>
	.title {
		font-family: var(--font-mono);
		font-weight: var(--font-semi);
		font-size: var(--font-xs);
		text-transform: uppercase;
		letter-spacing: 0.125em;
		opacity: 0.7;
		&:empty {
			display: none;
		}
	}
	.column {
		gap: calc(var(--unit));
	}
</style>

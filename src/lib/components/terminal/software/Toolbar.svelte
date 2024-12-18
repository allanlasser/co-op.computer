<div class="toolbar">
	<slot />
</div>

<style>
	.toolbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: var(--terminal-inverted-background);
		color: var(--terminal-inverted-color);
		padding: 0.375rem 0.75rem;
		align-items: center;
		align-self: stretch;
		font-size: 0.75rem;
		font-weight: 600;
	}
	:global(.toolbar a) {
		text-decoration-color: var(--terminal-inverted-stroke-color);
		&:hover,
		&:focus {
			background-color: var(--terminal-inverted-fill-color);
			text-decoration-color: var(--terminal-inverted-stroke-color);
		}
		&:focus {
			outline: 2px solid currentColor;
		}
	}
</style>

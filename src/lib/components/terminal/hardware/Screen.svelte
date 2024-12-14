<script lang="ts">
	export let powered: boolean = false;
</script>

<div class="screen" class:powered>
	<slot />
	<div class="glare"></div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		position: relative;

		border-radius: 1.5rem;
		border: 4px solid var(--hardware-inset);
		background: var(--black);

		transition: background 0.25s ease-in;
	}
	.screen.powered {
		background: var(--terminal-background);
	}
	.glare {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 0.75;
		background: radial-gradient(44.86% 47.44% at 50% 6.35%, var(--white-2) 0%, var(--white-0) 100%);
	}
</style>

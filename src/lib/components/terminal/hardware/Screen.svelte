<script lang="ts">
	export let powered: boolean = false;
</script>

<div class="screen" class:powered>
	<slot />
	<div class="glare decoration"></div>
	<div class="crt decoration"></div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;

		border-radius: 1.5rem;
		outline: 4px solid var(--hardware-inset);
		border: 12px solid var(--black-5);
		background: var(--black);

		transition: background 0.25s ease-in;
		filter: blur(0.02em);
	}
	.screen.powered {
		background: var(--terminal-background);
	}
	.decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		z-index: 1;
		opacity: 0.75;
	}
	.glare {
		background: radial-gradient(44.86% 47.44% at 50% 6.35%, var(--white-2) 0%, var(--white-0) 100%);
	}
</style>

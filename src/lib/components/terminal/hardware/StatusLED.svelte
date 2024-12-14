<script lang="ts" context="module">
	export type Status = 'idle' | 'loading' | 'error' | 'ok';
</script>

<script lang="ts">
	export let status: Status = 'idle';
</script>

<div class="status">
	<div class="led {status}"></div>
</div>

<style>
	.status {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.led {
		height: 1rem;
		width: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--black-4);
	}
	.led.idle {
		background: radial-gradient(
				90.63% 90.63% at 50% 9.37%,
				rgba(255, 255, 255, 0.2) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			radial-gradient(106.25% 106.25% at 50% 25%, #053fc6 0%, rgba(1, 24, 78, 0.9) 100%);
		box-shadow: 0px 0px 2px 0px #00083b inset;
	}
	.led.loading {
	}
	.led.error {
	}
	.led.ok {
		background: radial-gradient(
				90.63% 90.63% at 50% 9.37%,
				rgba(255, 255, 255, 0.2) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			radial-gradient(106.25% 106.25% at 50% 25%, #a4ff90 0%, rgba(36, 196, 0, 0.9) 100%);
		box-shadow: 0px 0px 2px 0px #1c8b03 inset;
		filter: drop-shadow(0px -3.048px 6.095px rgba(36, 196, 0, 0.78));
	}
</style>

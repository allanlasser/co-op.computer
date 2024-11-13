<script lang="ts">
	export let type: 'success' | 'error' | 'info' = 'info';
</script>

<div class="toast {type}">
	<div class="inner">
		<slot />
	</div>
</div>

<style>
	.toast {
		padding: 1rem;
		background: var(--white);
		color: var(--black);
	}
	.success {
		background: var(--green-1);
		color: var(--green-5);
	}
	.error {
		background: var(--red-1);
		color: var(--red-5);
	}
	.inner {
		text-align: center;
		max-width: 32rem;
		margin: 0 auto;
	}
</style>

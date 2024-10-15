<div class="fullScreen centered account--bg">
	<slot />
</div>

<style>
	.fullScreen {
		min-width: 100%;
		min-height: 100%;
	}
	.centered {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.account--bg {
		background-color: var(--green-2);
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;
	export let timeout = 5000;

	const hide = () => {
		visible = false;
	};

	onMount(() => {
		visible = true;
		setTimeout(() => {
			visible = false;
		}, timeout);
	});
</script>

{#if visible}
	<div class="flash" transition:fade>
		<slot {hide} />
	</div>
{/if}

<style>
	.flash {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>

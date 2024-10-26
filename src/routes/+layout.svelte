<script>
	import '$lib/styles/app.css';
	import About from '@/lib/components/layout/About.svelte';
	import Navigation from '@/lib/components/layout/Navigation.svelte';

	export let data;

	$: user = data.session?.user;
</script>

<div class="app">
	<Navigation />
	<slot />
	<About />
</div>

<style>
	.app {
		min-height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>

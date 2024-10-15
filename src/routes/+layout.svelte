<script>
	import '$lib/styles/app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;

	$: user = data.session?.user;
</script>

<div class="app">
	<Navigation {user} />
	<slot />
</div>

<style>
	.app {
		min-height: 100%;
		min-width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>

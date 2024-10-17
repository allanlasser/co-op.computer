<script lang="ts">
	export let data;

	$: user = data.session?.user;
</script>

<div class="page">
	<h1>hello {user ? user.username : 'world'}</h1>
	<ul>
		<li><a href="/tools">Find Tool</a></li>
		<li><a href="/tools/new">Contribute</a></li>
	</ul>
</div>

<style>
	.page {
		background: var(--background);
		width: 100%;
		padding: 2rem;
	}
	h1 {
		font-size: calc(2 * var(--font-xl));
	}
	ul {
		display: flex;
		gap: 2rem;
		padding: 0;
		margin: 2rem 0;
		list-style-type: none;
		font-size: var(--font-lg);
		font-weight: var(--font-bold);
	}
</style>

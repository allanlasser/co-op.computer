<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form;

	$: if (form?.success) {
		// show a success message
		goto('/tools');
	}
</script>

<div class="page">
	<h1>Add a Tool</h1>
	<form method="POST" use:enhance>
		<label>
			Name
			<input name="name" type="name" />
		</label>
		<button>Add tool</button>
	</form>
	{#if form?.success}
		<p>Tool added!</p>
	{/if}
</div>

<style>
	.page {
		margin: calc(4 * var(--unit)) auto;
		max-width: 64rem;
	}
	form {
		margin: calc(2 * var(--unit)) 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: calc(2 * var(--unit));
	}
</style>

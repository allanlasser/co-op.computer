<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form;

	$: if (form?.success) {
		// show a success message
		goto('/account');
	}
</script>

<div class="page fullScreen centered">
	<div class="card">
		<h1>Start a new Group</h1>
		<form method="POST" use:enhance>
			<label>
				Name
				<input name="name" type="name" />
			</label>
			<button>Create Group</button>
		</form>
		{#if form?.success}
			<p>Group created!</p>
		{/if}
	</div>
</div>

<style>
	form {
		margin: calc(2 * var(--unit)) 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: calc(2 * var(--unit));
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToolPath } from '$lib/utils/routes';

	export let data;

	$: tool = data.tool;

	function confirmDelete(event: SubmitEvent) {
		if (!confirm('Are you sure you want to delete this item?')) {
			event.preventDefault();
		}
	}
</script>

<div class="page">
	<h3>Editing <a href={getToolPath(tool)}>{tool.name}</a></h3>
	<form id="editTool" method="POST" action="?/edit" use:enhance>
		<input type="hidden" name="id" value={tool.id} />
		<label>
			Name
			<input name="name" type="name" value={tool.name} />
		</label>
		<button type="submit">Save</button>
	</form>
	<form class="danger" method="POST" action="?/delete" on:submit={confirmDelete}>
		<input type="hidden" name="id" value={tool.id} />
		<h4>Delete tool</h4>
		<p>Careful: this action cannot be undone.</p>
		<button type="submit">Delete</button>
	</form>
</div>

<style>
	.page,
	form {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
		padding: var(--unit);
	}
	.danger {
		background: #ffdada;
		padding: calc(2 * var(--unit));
		border-radius: var(--br-3);
	}
	.danger button {
		background: #bf0a43;
		&:hover,
		&:focus {
			background: #ed4077;
		}
	}
</style>

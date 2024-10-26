<script lang="ts">
	import { enhance } from '$app/forms';
	import { getGroupPath } from '$lib/utils/routes';

	export let data;

	$: group = data.group;

	function confirmDelete(event: SubmitEvent) {
		if (!confirm('Are you sure you want to delete this group?')) {
			event.preventDefault();
		}
	}
</script>

<div class="page">
	<h3>Editing <a href={getGroupPath(group)}>{group.name}</a></h3>
	<form class="card" id="editGroup" method="POST" action="?/edit" use:enhance>
		<input type="hidden" name="id" value={group.id} />
		<label>
			Name
			<input name="name" type="name" value={group.name} />
		</label>
		<button type="submit">Save</button>
	</form>
	<form class="card danger" method="POST" action="?/delete" on:submit={confirmDelete}>
		<input type="hidden" name="id" value={group.id} />
		<h4>Delete group</h4>
		<p>Careful: this action cannot be undone.</p>
		<button type="submit">Delete</button>
	</form>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
		padding: var(--unit);
	}
	form {
		margin: 0;
		padding: 0;
	}
	.card {
		padding: calc(4 * var(--unit));
	}
	.danger {
		background: #ffdada;
		border-radius: var(--br-3);
	}
	.danger button {
		background: #ed4077;
	}
</style>

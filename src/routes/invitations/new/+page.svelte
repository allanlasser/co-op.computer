<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: if (form?.success) {
		// show a success message
		// clear the form
	}

	let toGroupId = data.toGroupId;
</script>

<div class="page fullScreen centered">
	<div class="card">
		<h1>Invite a new member</h1>
		<form method="POST" use:enhance>
			<label>
				Email
				<input name="toEmail" type="email" required />
			</label>
			<label>
				Group
				<select name="toGroupId" bind:value={toGroupId}>
					{#await data.groups then groups}
						{#each groups as group}
							<option value={group.id}>{group.name}</option>
						{/each}
					{/await}
				</select>
			</label>
			<button>Send Invitation</button>
		</form>
		{#if form?.success}
			<p>Invitation sent!</p>
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

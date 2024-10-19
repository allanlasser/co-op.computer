<script lang="ts">
	import { getGroupPath, getToolPath } from '$lib/utils/routes';

	export let data;

	$: user = data.session.user;
</script>

<div class="account page">
	<div class="card">
		<header>
			<h2>Welcome back, {user.username}</h2>
			<a href="/account/signout">Sign Out</a>
		</header>
		<div class="row">
			<div class="column">
				<h3>Your Tools</h3>
				{#await data.tools then results}
					<ul>
						{#each results as result}
							<li>
								<div class="tool">
									<h4><a href={getToolPath(result.tools)}>{result.tools.name}</a></h4>
								</div>
							</li>
						{:else}
							<li>
								<p>You don't have any tools.</p>
								<p><a href="/tools/new">Start by adding one</a></p>
							</li>
						{/each}
					</ul>
				{:catch error}
					<p>Encountered an error while fetching your tools.</p>
					<p>{error.message}</p>
				{/await}
			</div>

			<div class="column">
				<h3>Your Groups</h3>
				{#await data.groups then groups}
					<ul>
						{#each groups as group}
							<li>
								<div class="tool">
									<h4><a href={getGroupPath(group)}>{group.name}</a></h4>
								</div>
							</li>
						{:else}
							<li>
								<p>You don't belong to any groups.</p>
								<p><a href="/groups/new">Start your own</a></p>
							</li>
						{/each}
					</ul>
				{:catch error}
					<p>Encountered an error while fetching your groups.</p>
					<p>{error.message}</p>
				{/await}
			</div>
		</div>
	</div>
</div>

<style>
	.account {
		width: 100%;
		height: 100%;
		background: var(--background);
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		gap: calc(4 * var(--unit));
	}

	.row {
		display: flex;
		gap: calc(4 * var(--unit));
	}

	.column {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		gap: calc(var(--unit));
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		padding: 0;
		gap: calc(var(--unit));
	}

	h2 {
		font-size: calc(1.25 * var(--font-xl));
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: var(--font-xl);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--gray-1);
	}

	h4 {
		font-size: var(--font-lg);
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Maybe } from '@/lib/utils/types';
	import Field from '../ui/Field.svelte';

	export let data: Record<string, string> = {};
	export let invitation: string | null = data?.invitation || '';
	export let errors: Maybe<string[] | Record<string, string[]>> = {};

	$: origin = $page.url.origin;

	let email = data.email || '';
	let username = data.username || '';
	let password = data.password || '';
	let confirmPassword = data.confirmPassword || '';
</script>

<form method="POST" aria-label="Create account" use:enhance>
	<div class="row">
		<Field
			label="Invitation"
			help="An invitation is required to join CO-OP"
			errors={errors?.invitation}
		>
			<input
				type="text"
				name="invitation"
				required
				value={invitation ?? ''}
				readonly={Boolean(invitation)}
			/>
		</Field>
	</div>
	<div class="column">
		<Field label="Email" errors={errors?.email}>
			<input type="email" name="email" bind:value={email} />
		</Field>
		<Field label="Username" errors={errors?.username}>
			<input type="text" name="username" bind:value={username} />
			<div slot="help">
				<p>Your username will be used in your profile URL:</p>
				<p>{origin}/users/{username}</p>
			</div>
		</Field>
	</div>
	<div class="column">
		<Field label="Password" errors={errors?.password}>
			<input type="text" name="password" bind:value={password} />
		</Field>
		<Field label="Confirm Password" errors={errors?.confirmPassword}>
			<input type="text" name="confirmPassword" bind:value={confirmPassword} />
		</Field>
	</div>
	<footer class="row center">
		<button type="submit" class="primary large" style="min-width: 8em;">Sign Up</button>
	</footer>
</form>

<style>
	form {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
	}
	[name='invitation'] {
		font-family: var(--font-mono);
	}
	.column {
		flex: 1 1 16rem;
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--unit));
	}
	.row {
		flex: 1 1 100%;
	}
	.large {
		font-size: var(--font-lg);
	}
	footer {
		display: flex;
		justify-content: center;
		padding: 0.5rem 0.25rem;
	}
</style>

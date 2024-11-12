<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { User } from '@/lib/db/schema';
	import type { Maybe } from '@/lib/utils/types';
	import Field from '../ui/Field.svelte';

	export let errors: Maybe<string[] | Record<string, string[]>> = {};
	export let user: User;

	$: origin = $page.url.origin;
	$: disabled = user.email === email && user.username === username;

	let email = user.email;
	let username = user.username;
</script>

<form action="/account/settings?/edit" method="POST" aria-label="Edit account" use:enhance>
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
	<button {disabled} type="submit" class="primary" style="min-width: 8em;">Save</button>
</form>

<style>
	form {
		flex: 1 1 auto;
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--unit));
	}
	button {
		align-self: flex-start;
	}
</style>

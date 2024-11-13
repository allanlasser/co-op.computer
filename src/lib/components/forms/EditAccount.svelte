<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { User } from '@/lib/db/schema';
	import Field from '../ui/Field.svelte';
	import { CheckCircle2, XCircle } from 'lucide-svelte';

	export let action: string;
	export let errors: Record<string, string[]> = {};
	export let user: User;

	$: origin = $page.url.origin;
	$: disabled = user.email === email && user.username === username;

	let email = user.email;
	let username = user.username;
</script>

<form
	{action}
	method="POST"
	aria-label="Edit account"
	use:enhance={() =>
		({ update }) =>
			update({ reset: false })}
>
	<Field label="Email" errors={errors?.email}>
		<input type="email" name="email" bind:value={email} />
		<div slot="help">
			{#if email === user.verifiedEmail}
				<p class="help success">
					<CheckCircle2 size={16} strokeWidth={2} />
					This email is verified
				</p>
			{:else}
				<p class="help error">
					<XCircle size={16} strokeWidth={2} />
					This email is unverified
				</p>
			{/if}
		</div>
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
	.help {
		display: flex;
		align-items: center;
		gap: var(--unit);
	}
	.success {
		color: teal;
		fill: teal;
		stroke: teal;
	}
	.error {
		color: orangered;
		fill: orangered;
		stroke: orangered;
	}
</style>

<script lang="ts">
	import ChangePasswordForm from '@/lib/components/forms/ChangePassword.svelte';
	import EditAccountForm from '@/lib/components/forms/EditAccount.svelte';
	import Card from '@/lib/components/ui/Card.svelte';
	import Flash from '@/lib/components/ui/Flash.svelte';
	import Toast from '@/lib/components/ui/Toast.svelte';
	import { getErrors } from '@/lib/utils/forms';

	export let data;
	export let form;

	$: user = data.user;
</script>

<div class="page">
	<header>
		<h1>
			<span class="small"
				><a href="/account">Account</a><span class="separator">&nbsp;/&nbsp;</span></span
			>Settings
		</h1>
	</header>
	{#if form?.success}
		<Flash>
			<Toast type="success">
				<p>{form?.message}</p>
			</Toast>
		</Flash>
	{/if}
	<Card title="Edit Account">
		<EditAccountForm action="/account/settings?/edit" {user} errors={getErrors(form?.errors)} />
	</Card>
	<Card title="Change Password">
		<ChangePasswordForm action="/account/settings?/password" errors={getErrors(form?.errors)} />
	</Card>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		flex-wrap: wrap;
		align-items: flex-start;
		gap: calc(2 * var(--unit));
	}
	header {
		grid-column: 1 / -1;
		padding: 2rem 0;
		position: relative;
	}
	h1 {
		font-size: calc(1.25 * var(--font-xl));
		font-weight: var(--font-semi);
	}
	h1 a {
		color: var(--gray-4);
		text-decoration: none;
		&:hover {
			color: teal;
		}
	}
	.small {
		font-size: calc(1.25 * var(--font-lg));
	}
	.separator {
		color: var(--gray-3);
	}
	header {
		flex: 1 1 100%;
	}
</style>

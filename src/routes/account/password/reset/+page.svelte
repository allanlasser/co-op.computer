<script lang="ts">
	import ChangePassword from '@/lib/components/forms/ChangePassword.svelte';
	import Card from '@/lib/components/ui/Card.svelte';

	export let data;
	export let form;
</script>

{#if form?.success}
	<div class="page">
		<header>
			<h1 class="xl">Password Reset</h1>
		</header>
		<Card>
			<p>Your password has been reset. You can now sign in with your new password.</p>
			<p><a href="/account/signin">Sign In</a></p>
		</Card>
	</div>
{:else}
	<div class="page">
		<header>
			<h1 class="xl">Reset Password</h1>
		</header>
		<Card>
			<ChangePassword action="/account/password/reset" errors={form?.errors}>
				<input type="hidden" name="code" value={data.code} />
			</ChangePassword>
		</Card>
	</div>
{/if}

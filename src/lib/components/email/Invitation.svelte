<script lang="ts">
	import type { Group, Invitation } from '$lib/db/schema';
	import type { User } from '$lib/db/schema';
	import { getInvitationPath } from '$lib/utils/routes';
	import type { Maybe } from '$lib/utils/types';
	import { Container, Button, Link, Hr, Html, Text } from 'svelty-email';

	export let origin: string;
	export let invitation: Invitation;
	export let fromUser: User;
	export let toGroup: Group;
	export let toUser: Maybe<User> = undefined;

	let inviteHref = new URL(getInvitationPath(invitation), origin).href;
	let newAccountHref = new URL(`/account/new?invitation=${invitation.id}`, origin).href;
</script>

<Html lang="en">
	<Text
		>Your friend {fromUser.username} has invited you to join their group {toGroup.name}{#if !toUser}&nbsp;on
			CO-OP, the decentralized library system{/if}.</Text
	>
	<Button href={inviteHref}>View Invitation</Button>
	<Hr />
	<Text>Or use this code when <Link href={newAccountHref}>creating your account</Link>:</Text>
	<Container><Text>{invitation.id}</Text></Container>
</Html>

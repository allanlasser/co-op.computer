<script lang="ts">
	import type { Group, Invitation } from '$lib/db/schema';
	import type { User } from '$lib/db/schema';
	import { getInvitationPath } from '$lib/utils/routes';
	import type { Maybe } from '$lib/utils/types';
	import type { StandardLonghandProperties } from 'csstype';
	import { Button, Link, Hr, Html, Body, Text } from 'svelty-email';

	export let origin: string;
	export let invitation: Invitation;
	export let fromUser: User;
	export let toGroup: Group;
	export let toUser: Maybe<User> = undefined;

	let inviteHref = new URL(getInvitationPath(invitation), origin).href;
	let newAccountHref = new URL(`/account/new?invitation=${invitation.id}`, origin).href;

	const styles: Record<string, StandardLonghandProperties> = {
		body: {
			fontFamily: '"IBM Plex Sans", sans-serif',
			width: '100%',
			maxWidth: '600px',
			marginLeft: 'auto',
			marginRight: 'auto',
			backgroundColor: '#ffffff',
			boxSizing: 'border-box'
		},
		button: {
			marginLeft: 'auto',
			marginRight: 'auto',
			color: '#ffffff',
			backgroundColor: 'teal',
			fontSize: '16px',
			fontWeight: '600',
			paddingTop: '0.5rem',
			paddingBottom: '0.5rem',
			paddingLeft: '1rem',
			paddingRight: '1rem',
			borderBottomLeftRadius: '0.5rem',
			borderBottomRightRadius: '0.5rem',
			borderTopLeftRadius: '0.5rem',
			borderTopRightRadius: '0.5rem'
		},
		center: {
			textAlign: 'center'
		},
		codeContainer: {
			display: 'block',
			width: '100%',
			backgroundColor: '#ececec',
			fontFamily: '"IBM Plex Mono", monospace',
			textAlign: 'center',
			paddingTop: '0.25rem',
			paddingBottom: '0.25rem',
			paddingLeft: '0.5rem',
			paddingRight: '0.5rem',
			boxSizing: 'border-box',
			borderBottomLeftRadius: '2rem',
			borderBottomRightRadius: '2rem',
			borderTopLeftRadius: '2rem',
			borderTopRightRadius: '2rem'
		}
	};
</script>

<Html lang="en">
	<style>
		@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
	</style>
	<Body style={styles.body}>
		<Text
			>Your friend {fromUser.username} has invited you to join their group {toGroup.name}{#if !toUser}&nbsp;on
				CO-OP, the decentralized library system{/if}.</Text
		>
		<Text style={styles.center}
			><Button style={styles.button} href={inviteHref}>View Invitation</Button></Text
		>
		<Hr />
		<Text style={styles.center}
			>Or use this code when <Link href={newAccountHref}>creating your account</Link>:</Text
		>
		<Text style={styles.codeContainer}>{invitation.id}</Text>
	</Body>
</Html>

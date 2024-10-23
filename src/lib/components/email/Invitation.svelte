<script lang="ts">
	import type { Group, Invitation } from '$lib/db/schema';
	import type { User } from '$lib/db/schema';
	import { styleToString } from '$lib/utils/styles';
	import { getInvitationPath } from '$lib/utils/routes';
	import type { Maybe } from '$lib/utils/types';
	import type { StandardProperties } from 'csstype';
	import { Hr, Container, Link, Text } from 'svelty-email';
	import Email from './Email.svelte';

	export let origin: string;
	export let invitation: Invitation;
	export let fromUser: User;
	export let toGroup: Group;
	export let toUser: Maybe<User> = undefined;

	let inviteHref = new URL(getInvitationPath(invitation), origin).href;
	let newAccountHref = new URL(`/account/new?invitation=${invitation.id}`, origin).href;

	const styles: Record<string, StandardProperties> = {
		message: {
			fontSize: '1.125rem',
			fontWeight: '500',
			lineHeight: '2'
		},
		button: {
			display: 'inline-block',
			boxSizing: 'border-box',
			color: '#ffffff',
			backgroundColor: 'teal',
			border: '2px solid rgba(0,0,0,.2)',
			borderBottomWidth: '4px',
			fontSize: '16px',
			fontWeight: '600',
			minWidth: '12rem',
			margin: '.5rem 0',
			padding: '0.5rem 1rem',
			borderRadius: '0.5rem',
			textDecoration: 'none'
		},
		center: {
			textAlign: 'center'
		},
		link: {
			color: 'teal',
			textDecoration: 'underline'
		},
		codeContainer: {
			boxSizing: 'border-box',
			display: 'block',
			width: '100%',
			backgroundColor: 'rgba(0,0,0,.05)',
			fontFamily: '"IBM Plex Mono", monospace',
			fontWeight: 500,
			textAlign: 'center',
			padding: '0.5rem',
			borderRadius: '2rem',
			boxShadow: 'inset 0 2px 2px 0 rgba(0,0,0,.2)'
		},
		entity: {
			fontWeight: '700',
			boxShadow: '0 2px 0 currentColor',
			whiteSpace: 'nowrap'
		},
		user: {
			color: 'indigo'
		},
		group: {
			color: 'orangered'
		}
	};
</script>

<Email>
	<Container style={styles.center}>
		<Text style={styles.message}>
			Your friend <span style={styleToString([styles.entity, styles.user])}
				>{fromUser.username}</span
			>
			invites you to join
			<span style={styleToString([styles.entity, styles.group])}>{toGroup.name}</span>
			{#if !toUser}on <span style={styleToString(styles.entity)}>CO-OP</span> to borrow and lend tools
				within the group{/if}.
		</Text>
		<a style={styleToString(styles.button)} href={inviteHref}>View Invitation</a>
	</Container>
	<Text style={styles.center}>
		Or use this code when <Link href={newAccountHref} style={styles.link}
			>creating your account</Link
		>:
	</Text>
	<Text style={styles.codeContainer}>{invitation.id}</Text>
</Email>

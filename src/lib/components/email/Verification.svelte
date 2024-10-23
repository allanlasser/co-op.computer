<script lang="ts">
	import type { Verification } from '$lib/db/schema';
	import { getVerificationPath } from '$lib/utils/routes';
	import { Container, Heading, Hr, Text } from 'svelty-email';
	import Email from './Email.svelte';
	import type { StandardProperties } from 'csstype';
	import { styleToString } from '$lib/utils/styles';

	export let origin;
	export let verification: Verification;

	const href = new URL(getVerificationPath(verification), origin).href;

	const styles: Record<string, StandardProperties> = {
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
			margin: '0.5rem 0',
			padding: '0.5rem 1rem',
			borderRadius: '0.5rem',
			textDecoration: 'none'
		},
		container: {
			padding: '1rem',
			textAlign: 'center'
		}
	};
</script>

<Email>
	<Container style={styles.container}>
		<Heading as="h1">Verify your email</Heading>
		<Text>In order to participate on CO-OP, you need a verified email address.</Text>
		<a style={styleToString(styles.button)} {href}>Verify your email</a>
	</Container>
</Email>

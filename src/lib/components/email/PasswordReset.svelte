<script lang="ts">
	import { Container, Heading, Text } from 'svelty-email';
	import Email from './Email.svelte';

	export let origin: string;
	export let code: string;

	const href = `${origin}/account/password/reset?code=${code}`;
</script>

<Email>
	<Container>
		<Heading as="h1">Reset your password</Heading>
		<Text>Click the link below to reset your password:</Text>
		<a {href}>Reset Password</a>
		<Text>This link will expire in 1 hour.</Text>
	</Container>
</Email>

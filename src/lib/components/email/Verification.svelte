<script lang="ts">
	import type { Verification } from '$lib/db/schema';
	import { getVerificationPath } from '$lib/utils/routes';
	import { Link, Hr, Html, Text } from 'svelty-email';

	export let origin;
	export let verification: Verification;

	const href = new URL(getVerificationPath(verification), origin).href;
</script>

<Html lang="en">
	<Text>CO-OP</Text>
	<Hr />
	<Link {href}>Verify your email</Link>
</Html>

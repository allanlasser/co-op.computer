<script>
	import { Link, Hr, Html, Text } from 'svelty-email';

	export let href;
</script>

<Html lang="en">
	<Text>CO-OP</Text>
	<Hr />
	<Link {href}>Verify your email</Link>
</Html>

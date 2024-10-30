<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { styleToString } from '$lib/utils/styles';
	import type { StandardProperties } from 'csstype';
	import { Html, Body, Head, Img, Link, Container } from 'svelty-email';
	export let lang = 'en';

	const styles: Record<string, StandardProperties> = {
		body: {
			fontSize: '16px',
			fontWeight: '400',
			fontFamily: '"IBM Plex Sans", sans-serif',
			width: '100%',
			maxWidth: '600px',
			margin: '0 auto',
			padding: '12px',
			boxSizing: 'border-box'
		},
		center: {
			display: 'inline-block',
			margin: '0 auto'
		},
		logo: {
			fontSize: '2rem',
			fontWeight: '700',
			textAlign: 'center',
			margin: '1rem auto'
		},
		card: {
			backgroundColor: '#ffffff',
			border: '1px solid rgba(0,0,0,.1)',
			borderBottomWidth: '2px',
			padding: '1.5rem',
			borderRadius: '0.5rem'
		}
	};
</script>

<Html {lang}>
	<Head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<slot name="head" />
	</Head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
		html {
			background-color: #fff9eb;
		}
	</style>
	<Body style={styles.body}>
		<Container style={styles.logo}>
			<Link href={PUBLIC_BASE_URL}>
				<Img height="32px" width="auto" style={styles.center} src="/logo.png" alt="CO-OP" />
			</Link>
		</Container>
		<Container style={styles.card}>
			<slot />
		</Container>
	</Body>
</Html>

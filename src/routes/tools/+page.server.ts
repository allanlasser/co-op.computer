import { redirect } from '@sveltejs/kit';
import { getTools } from '$lib/db/tools';

export async function load(event) {
	const session = event.locals.session;
	const nextUrl = event.url.pathname;
	if (!session) {
		return redirect(302, `/account/signin?then=${encodeURIComponent(nextUrl)}`);
	}
	return {
		session,
		tools: getTools()
	};
}

import { getTools } from '$lib/db/tools';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = event.locals.session;
	if (!session) {
		return redirect(302, '/account/signin');
	}
	return {
		session,
		tools: getTools()
	};
}

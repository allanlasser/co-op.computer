import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = event.locals.session;
	if (session) return redirect(302, `/account/`);
}

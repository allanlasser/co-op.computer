import { getToolsForOwner } from '$lib/db/tools.js';
import { getGroupsForUser } from '$lib/db/usersToGroups.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = event.locals.session;
	const nextUrl = event.url.pathname;
	if (!session) {
		return redirect(302, `/account/signin?then=${encodeURIComponent(nextUrl)}`);
	}
	return {
		session,
		tools: getToolsForOwner(session.user.id),
		groups: getGroupsForUser(session.user.id)
	};
}

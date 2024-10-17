import { getInvitation } from '$lib/db/invitations';
import { enlargeUUID } from '$lib/utils/routes';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const user = event.locals.session?.user;
	const { shortId } = event.params;
	const uuid = enlargeUUID(shortId);
	const invitation = await getInvitation(uuid);
	const isToUser = user ? invitation.users.id !== user.id : true;
	if (!invitation || !isToUser) {
		throw error(404, 'Page Miss');
	}

	return {
		...invitation
	};
}

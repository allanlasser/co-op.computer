import { getGroup } from '$lib/db/groups';
import { getInvitationsToGroup } from '$lib/db/invitations';
import { getUsersForGroup, isUserInGroup } from '$lib/db/usersToGroups';
import { requireAuth } from '$lib/utils/auth';
import { enlargeUUID } from '$lib/utils/routes';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const { user } = requireAuth(event);
	const { shortId } = event.params;
	const uuid = enlargeUUID(shortId);
	const [group, userIsMember] = await Promise.all([getGroup(uuid), isUserInGroup(user.id, uuid)]);
	if (!group || !userIsMember) {
		throw error(404, 'Group not found');
	}
	return {
		group,
		members: getUsersForGroup(group.id),
		invitations: getInvitationsToGroup(group.id)
	};
}

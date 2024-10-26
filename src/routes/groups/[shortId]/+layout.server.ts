import { getGroup } from '$lib/db/groups';
import { isUserInGroup } from '$lib/db/usersToGroups';
import { requireAuth } from '$lib/utils/auth';
import { getUUIDfromParams } from '$lib/utils/routes';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const { user } = requireAuth(event);
	const uuid = getUUIDfromParams(event);
	const [group, userIsMember] = await Promise.all([getGroup(uuid), isUserInGroup(user.id, uuid)]);
	if (!group || !userIsMember) {
		throw error(404, 'Group not found');
	}
	return {
		user,
		group
	};
}

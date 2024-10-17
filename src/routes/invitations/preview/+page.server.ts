import { getGroup } from '$lib/db/groups';
import { isUserInGroup } from '$lib/db/usersToGroups';
import { requireAuth } from '$lib/utils/auth';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const session = requireAuth(event);
	const userId = session.user.id;
	// Check whether the user belongs to the group in the
	const toGroupId = event.url.searchParams.get('toGroup');
	const userBelongsToGroup = toGroupId && (await isUserInGroup(userId, toGroupId));
	if (!userBelongsToGroup) {
		throw error(404, 'Page Miss');
	}
	return {
		session,
		toGroupId,
		group: await getGroup(toGroupId)
	};
}

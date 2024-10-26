import { fail, redirect } from '@sveltejs/kit';
import { getToolsForGroup } from '@/lib/db/tools';
import { getInvitationsToGroup } from '$lib/db/invitations';
import { getUsersForGroup, removeUserFromGroup } from '$lib/db/usersToGroups';
import { getUUIDfromParams } from '@/lib/utils/routes';

export async function load(event) {
	const uuid = getUUIDfromParams(event);
	return {
		tools: getToolsForGroup(uuid),
		members: getUsersForGroup(uuid),
		invitations: getInvitationsToGroup(uuid)
	};
}

export const actions = {
	leave: async (event) => {
		const groupId = getUUIDfromParams(event);
		const user = event.locals.session?.user;
		if (!user) {
			return fail(403, { errors: ['Unauthorized'] });
		}
		await removeUserFromGroup(user.id, groupId);
		return redirect(301, '/');
	}
};

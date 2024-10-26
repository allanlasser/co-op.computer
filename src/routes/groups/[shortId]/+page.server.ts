import { getToolsForGroup } from '@/lib/db/tools';
import { getInvitationsToGroup } from '$lib/db/invitations';
import { getUsersForGroup } from '$lib/db/usersToGroups';
import { getUUIDfromParams } from '@/lib/utils/routes';

export async function load(event) {
	const uuid = getUUIDfromParams(event);
	return {
		tools: getToolsForGroup(uuid),
		members: getUsersForGroup(uuid),
		invitations: getInvitationsToGroup(uuid)
	};
}

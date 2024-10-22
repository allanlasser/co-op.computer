import { fail } from '@sveltejs/kit';
import { requireAuth } from '$lib/utils/auth';
import { createGroup } from '$lib/db/groups';
import { addUserToGroup } from '$lib/db/usersToGroups';

export async function load(event) {
	requireAuth(event);
	return {};
}

export const actions = {
	default: async ({ request, locals }) => {
		const user = locals.session?.user;
		if (!user) {
			return fail(403, {
				errors: 'You must be signed in to add a new tool.'
			});
		}
		const data = await request.formData();
		const name = String(data.get('name'));
		const group = await createGroup({ name });
		await addUserToGroup(user.id, group.id);
		return { success: true, data: { group } };
	}
};

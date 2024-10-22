import { fail } from '@sveltejs/kit';
import { createTool } from '$lib/db/tools';
import { requireAuth } from '$lib/utils/auth';

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
		const newTool = await createTool({ name, ownerId: user.id });
		return { success: true, data: { ...newTool } };
	}
};

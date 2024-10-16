import type { User, Tool } from '$lib/db/schema.js';
import { deleteTool, updateTool } from '$lib/db/tools.js';
import { requireAuth } from '$lib/utils/auth.js';
import { getToolPath } from '$lib/utils/routes.js';
import { formDataToObject, type Maybe } from '$lib/utils/types.js';
import { error, fail, redirect } from '@sveltejs/kit';

function isOwner(user: Maybe<User>, tool: Maybe<Tool>) {
	if (!user || !tool) return false;
	return user.id === tool.ownerId;
}

export async function load(event) {
	requireAuth(event);
	const { user } = event.locals.session ?? {};
	const { tool } = await event.parent();
	if (!isOwner(user, tool)) {
		throw error(403, 'You do not own this tool');
	}
	return {};
}

export const actions = {
	edit: async (event) => {
		const formData = await event.request.formData();
		const updatedData = formDataToObject(formData);
		if (!updatedData.id) {
			return fail(400, {
				errors: ['Missing ID']
			});
		}
		const [tool] = await updateTool(updatedData);
		throw redirect(302, getToolPath(tool));
	},
	delete: async (event) => {
		const formData = await event.request.formData();
		const { id } = formDataToObject(formData);
		if (!id) {
			return fail(400, {
				errors: ['Missing ID']
			});
		}
		await deleteTool(id);
		throw redirect(302, '/tools');
	}
};

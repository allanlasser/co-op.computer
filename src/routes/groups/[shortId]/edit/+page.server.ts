import { deleteGroup, updateGroup } from '@/lib/db/groups';
import { getGroupPath } from '@/lib/utils/routes';
import { formDataToObject } from '@/lib/utils/types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	edit: async (event) => {
		const formData = await event.request.formData();
		const updatedData = formDataToObject(formData);
		if (!updatedData.id) {
			return fail(400, {
				errors: ['Missing ID']
			});
		}
		const group = await updateGroup(updatedData);
		throw redirect(302, getGroupPath(group));
	},
	delete: async (event) => {
		const formData = await event.request.formData();
		const { id } = formDataToObject(formData);
		if (!id) {
			return fail(400, {
				errors: ['Missing ID']
			});
		}
		await deleteGroup(id);
		throw redirect(302, '/');
	}
};

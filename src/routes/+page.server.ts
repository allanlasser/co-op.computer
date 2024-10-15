import { getTools, createTool } from '$lib/db/tools';

export async function load(event) {
	const session = event.locals.session;
	return {
		session,
		tools: getTools()
	};
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const newTool = await createTool({ name });
		return { success: true, data: { ...newTool } };
	}
};

import { db } from '$lib/db';
import { Tools } from '$lib/db/schema';

async function getTools() {
	return db.select().from(Tools);
}

async function createTool(newTool: typeof Tools.$inferInsert) {
	return db.insert(Tools).values(newTool).returning();
}

export function load() {
	return { tools: getTools() };
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		console.log(name);
		const newTool = await createTool({ name });
		console.log(newTool);
		return { success: true, data: { ...newTool } };
	}
};

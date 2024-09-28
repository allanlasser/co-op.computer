import { db } from '$lib/db';
import { Tools } from '$lib/db/schema';

export async function getTools() {
	return db.select().from(Tools);
}

export async function createTool(newTool: typeof Tools.$inferInsert) {
	return db.insert(Tools).values(newTool).returning();
}

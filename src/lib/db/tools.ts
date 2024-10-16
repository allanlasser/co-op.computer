import { eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Tools, Users } from '$lib/db/schema';

export async function getTool(uuid: string) {
	return db.selectDistinct().from(Tools).where(eq(Tools.id, uuid));
}

export async function getTools() {
	return db.select().from(Tools).innerJoin(Users, eq(Tools.ownerId, Users.id));
}

export async function getToolsForOwner(ownerId: string) {
	return db
		.select()
		.from(Tools)
		.where(eq(Tools.ownerId, ownerId))
		.innerJoin(Users, eq(Tools.ownerId, Users.id));
}

export async function createTool(newTool: typeof Tools.$inferInsert) {
	return db.insert(Tools).values(newTool).returning();
}

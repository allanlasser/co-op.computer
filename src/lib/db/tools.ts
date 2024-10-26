import { eq, inArray } from 'drizzle-orm';
import { db } from '$lib/db';
import { Tools, Users, UsersToGroups } from '$lib/db/schema';
import { getGroupsForUser } from './usersToGroups';

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

export async function getToolsForGroup(groupId: string) {
	return db
		.select()
		.from(Tools)
		.innerJoin(Users, eq(Tools.ownerId, Users.id))
		.innerJoin(UsersToGroups, eq(Users.id, UsersToGroups.userId))
		.where(eq(UsersToGroups.groupId, groupId));
}

export async function getToolsForUser(userId: string) {
	const groupIds = await getGroupsForUser(userId).then((groups) => groups.map((group) => group.id));
	return db
		.selectDistinctOn([Tools.id])
		.from(Tools)
		.innerJoin(Users, eq(Tools.ownerId, Users.id))
		.innerJoin(UsersToGroups, eq(Tools.ownerId, UsersToGroups.userId))
		.where(inArray(UsersToGroups.groupId, groupIds));
}

export async function createTool(newTool: typeof Tools.$inferInsert) {
	return db.insert(Tools).values(newTool).returning();
}

export async function updateTool(tool: Partial<typeof Tools.$inferSelect>) {
	if (!tool.id) throw TypeError('Missing Tool ID');
	return db.update(Tools).set(tool).where(eq(Tools.id, tool.id)).returning();
}

export async function deleteTool(id: string) {
	return db.delete(Tools).where(eq(Tools.id, id));
}

import { db } from '$lib/db';
import { eq } from 'drizzle-orm';
import { Groups, type Group } from './schema';

export async function getGroup(uuid: string): Promise<Group> {
	const [group] = await db.selectDistinct().from(Groups).where(eq(Groups.id, uuid));
	return group;
}

export async function getGroups(): Promise<Group[]> {
	return db.select().from(Groups);
}

export async function createGroup(values: { name: string }): Promise<Group> {
	const [group] = await db.insert(Groups).values(values).returning();
	return group;
}

export async function updateGroup(group: Partial<Group>): Promise<Group> {
	if (!group.id) throw TypeError('Missing Group ID');
	const [updatedGroup] = await db
		.update(Groups)
		.set(group)
		.where(eq(Groups.id, group.id))
		.returning();
	return updatedGroup;
}

export async function deleteGroup(id: string): Promise<void> {
	await db.delete(Groups).where(eq(Groups.id, id));
}

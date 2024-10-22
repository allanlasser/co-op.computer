import { db } from '$lib/db';
import { and, eq } from 'drizzle-orm';
import { Groups, Users, UsersToGroups, type Group, type User } from './schema';

export async function addUserToGroup(userId: string, groupId: string): Promise<void> {
	await db.insert(UsersToGroups).values({ userId, groupId });
}

export async function removeUserFromGroup(userId: string, groupId: string): Promise<void> {
	await db
		.delete(UsersToGroups)
		.where(and(eq(UsersToGroups.userId, userId), eq(UsersToGroups.groupId, groupId)));
}

export async function isUserInGroup(userId: string, groupId: string): Promise<boolean> {
	const result = await db
		.select()
		.from(UsersToGroups)
		.where(and(eq(UsersToGroups.userId, userId), eq(UsersToGroups.groupId, groupId)))
		.limit(1); // Limit to 1 since we only need to know if a match exists
	return result.length > 0;
}

export async function getGroupsForUser(userId: string): Promise<Group[]> {
	const result = await db
		.select({ groups: Groups })
		.from(UsersToGroups)
		.innerJoin(Groups, eq(UsersToGroups.groupId, Groups.id))
		.where(eq(UsersToGroups.userId, userId));
	return result.map(({ groups }) => groups);
}

export async function getUsersForGroup(groupId: string): Promise<User[]> {
	const result = await db
		.select({ users: Users })
		.from(UsersToGroups)
		.innerJoin(Users, eq(UsersToGroups.userId, Users.id))
		.where(eq(UsersToGroups.groupId, groupId));
	return result.map(({ users }) => users);
}

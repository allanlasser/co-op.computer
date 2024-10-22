import { db } from '$lib/db';
import { and, eq } from 'drizzle-orm';
import { Invitations, type Invitation, Groups, Users, type User } from './schema';
import { addUserToGroup } from './usersToGroups';

export async function getInvitation(uuid: string) {
	const [result] = await db
		.selectDistinct()
		.from(Invitations)
		.innerJoin(Groups, eq(Invitations.toGroupId, Groups.id))
		.innerJoin(Users, eq(Invitations.fromUserId, Users.id))
		.where(eq(Invitations.id, uuid));
	return result;
}

// export async function getGroups(): Promise<Group[]> {
// 	return db.select().from(Groups);
// }

export async function createInvitation(
	values: typeof Invitations.$inferInsert
): Promise<Invitation> {
	const [invitation] = await db.insert(Invitations).values(values).returning();
	return invitation;
}

export async function updateInvitation(
	values: Partial<typeof Invitations.$inferInsert>
): Promise<Invitation> {
	if (!values.id) throw new TypeError('Missing Invitation ID');
	const [invitation] = await db
		.update(Invitations)
		.set(values)
		.where(eq(Invitations.id, values.id))
		.returning();
	return invitation;
}

export async function getInvitationsToGroup(
	groupId: string,
	accepted = false
): Promise<Invitation[]> {
	return db
		.select()
		.from(Invitations)
		.where(and(eq(Invitations.toGroupId, groupId), eq(Invitations.accepted, accepted)));
}

export async function acceptInvitation(invitationId: string, user: User): Promise<void> {
	const result = await getInvitation(invitationId);
	if (!result) throw new Error('Invitation not found');
	// mark the invitation as accepted and add the new user to the invitation group
	await updateInvitation({ id: result.invitations.id, accepted: true, toUserId: user.id });
	await addUserToGroup(user.id, result.groups.id);
}

// export async function updateGroup(group: Partial<Group>): Promise<Group> {
// 	if (!group.id) throw TypeError('Missing Group ID');
// 	const [updatedGroup] = await db
// 		.update(Groups)
// 		.set(group)
// 		.where(eq(Groups.id, group.id))
// 		.returning();
// 	return updatedGroup;
// }

// export async function deleteGroup(id: string): Promise<void> {
// 	await db.delete(Groups).where(eq(Groups.id, id));
// }

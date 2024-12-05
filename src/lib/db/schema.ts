import { sql, relations } from 'drizzle-orm';
import {
	text,
	pgTable,
	uuid,
	serial,
	timestamp,
	primaryKey,
	boolean,
	index
} from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	ordinal: serial('ordinal').notNull(), // your user number, for fun
	createdAt: timestamp('createdAt').defaultNow(),
	verifiedEmail: text('verified_email')
});

export const UsersRelations = relations(Users, ({ many }) => ({
	tools: many(Tools),
	groups: many(UsersToGroups),
	verifications: many(Verifications),
	sentInvitations: many(Invitations, { relationName: 'fromUser' }),
	receivedInvitations: many(Invitations, { relationName: 'toUser' })
}));

export type User = typeof Users.$inferSelect;

export const Groups = pgTable('groups', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	name: text('name').notNull(),
	createdAt: timestamp('createdAt').defaultNow()
});

export const GroupsRelations = relations(Groups, ({ many }) => ({
	users: many(UsersToGroups),
	invitations: many(Invitations)
}));

export type Group = typeof Groups.$inferSelect;

export const UsersToGroups = pgTable(
	'users_to_groups',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => Users.id, { onDelete: 'cascade' }),
		groupId: uuid('group_id')
			.notNull()
			.references(() => Groups.id, { onDelete: 'cascade' })
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.groupId] })
	})
);

export type UsersToGroups = typeof UsersToGroups.$inferSelect;

export const usersToGroupsRelations = relations(UsersToGroups, ({ one }) => ({
	group: one(Groups, {
		fields: [UsersToGroups.groupId],
		references: [Groups.id]
	}),
	user: one(Users, {
		fields: [UsersToGroups.userId],
		references: [Users.id]
	})
}));

export const Invitations = pgTable('invitations', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	fromUserId: uuid('from_user')
		.notNull()
		.references(() => Users.id),
	toGroupId: uuid('to_group')
		.notNull()
		.references(() => Groups.id),
	toUserId: uuid('to_user').references(() => Users.id),
	toEmail: text('to_email').notNull(),
	accepted: boolean('accepted').default(false)
});

export const InvitationsRelations = relations(Invitations, ({ one }) => ({
	fromUser: one(Users, {
		fields: [Invitations.fromUserId],
		references: [Users.id],
		relationName: 'fromUser'
	}),
	toUser: one(Users, {
		fields: [Invitations.toUserId],
		references: [Users.id],
		relationName: 'toUser'
	}),
	toGroup: one(Groups, {
		fields: [Invitations.toGroupId],
		references: [Groups.id]
	})
}));

export type Invitation = typeof Invitations.$inferSelect;

export const Verifications = pgTable('verifications', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	code: text('code').notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id),
	userEmail: text('user_email').notNull()
});

export const VerificationsRelations = relations(Verifications, ({ one }) => ({
	user: one(Users, {
		fields: [Verifications.userId],
		references: [Users.id]
	})
}));

export type Verification = typeof Verifications.$inferSelect;

export const PasswordResets = pgTable('password_resets', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`),
	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id),
	code: text('code').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const PasswordResetsRelations = relations(PasswordResets, ({ one }) => ({
	user: one(Users, {
		fields: [PasswordResets.userId],
		references: [Users.id]
	})
}));

export type PasswordReset = typeof PasswordResets.$inferSelect;

export const Tools = pgTable(
	'tools',
	{
		id: uuid('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`), // Generate a UUID by default
		name: text('name').notNull(),
		createdAt: timestamp('createdAt').defaultNow(),
		ownerId: uuid('owner_id').references(() => Users.id)
	},
	(table) => ({
		nameSearchIndex: index('tool_name_search_index').using(
			'gin',
			sql`to_tsvector('english', ${table.name})`
		)
	})
);

export const ToolsRelations = relations(Tools, ({ one }) => ({
	owner: one(Users, {
		fields: [Tools.ownerId],
		references: [Users.id]
	})
}));

export type Tool = typeof Tools.$inferSelect;

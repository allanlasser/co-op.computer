import { sql, relations } from 'drizzle-orm';
import { text, pgTable, uuid, serial, timestamp } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	ordinal: serial('ordinal').notNull(), // your user number, for fun
	createdAt: timestamp('createdAt').defaultNow()
});

export const UsersRelations = relations(Users, ({ many }) => ({
	tools: many(Tools)
}));

export type User = typeof Users.$inferSelect;

export const Tools = pgTable('tools', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	name: text('name').notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
	ownerId: uuid('owner_id').references(() => Users.id)
});

export const ToolsRelations = relations(Tools, ({ one }) => ({
	owner: one(Users, {
		fields: [Tools.ownerId],
		references: [Users.id]
	})
}));

export type Tool = typeof Tools.$inferSelect;

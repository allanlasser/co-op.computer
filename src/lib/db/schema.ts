import { text, pgTable, serial } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	email: text('email').notNull().unique(),
	username: text('username').notNull(),
	password: text('password').notNull()
});

export const Tools = pgTable('tools', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull()
});

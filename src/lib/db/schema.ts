import { sql } from 'drizzle-orm';
import { text, pgTable, uuid } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const Tools = pgTable('tools', {
	id: uuid('id')
		.notNull()
		.default(sql`gen_random_uuid()`), // Generate a UUID by default
	name: text('name').notNull()
});

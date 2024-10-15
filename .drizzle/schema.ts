import { pgTable, uuid, text, unique, serial } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const tools = pgTable("tools", {
	id: uuid("id").defaultRandom().notNull(),
	name: text("name").notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	username: text("username").notNull(),
	password: text("password").notNull(),
	ordinal: serial("ordinal").notNull(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});
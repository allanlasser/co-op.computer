import { pgTable, foreignKey, uuid, text, timestamp, unique, serial } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const tools = pgTable("tools", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	ownerId: uuid("owner_id"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		toolsOwnerIdUsersIdFk: foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "tools_owner_id_users_id_fk"
		}),
	}
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	username: text("username").notNull(),
	password: text("password").notNull(),
	ordinal: serial("ordinal").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});
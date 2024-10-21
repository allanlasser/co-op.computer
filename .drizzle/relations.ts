import { relations } from "drizzle-orm/relations";
import { users, tools } from "./schema";

export const toolsRelations = relations(tools, ({one}) => ({
	user: one(users, {
		fields: [tools.ownerId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	tools: many(tools),
}));
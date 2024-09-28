import { and, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Users } from '$lib/db/schema';

export type User = typeof Users.$inferSelect;

export async function getUser(email: string, pwHash: string) {
	return db
		.select()
		.from(Users)
		.where(and(eq(Users.email, email), eq(Users.password, pwHash)));
}

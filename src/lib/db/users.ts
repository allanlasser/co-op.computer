import { and, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Users } from '$lib/db/schema';
import { hash } from 'argon2';

export type User = typeof Users.$inferSelect;

export async function getUser(email: string, password: string) {
	const pwHash = await hash(password);
	return db
		.select()
		.from(Users)
		.where(and(eq(Users.email, email), eq(Users.password, pwHash)));
}

export async function createUser(email: string, username: string, password: string) {
	const pwHash = await hash(password);
	return db.insert(Users).values({ email, username, password: pwHash }).returning();
}

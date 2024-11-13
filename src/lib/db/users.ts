import { config } from 'dotenv';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Users, type User } from '$lib/db/schema';
import { hash, verify } from 'argon2';
import type { Maybe } from '$lib/utils/types';

config({ path: '.env.development.local' });

export async function createUser(email: string, username: string, password: string) {
	const pwHash = await hash(password);
	return db.insert(Users).values({ email, username, password: pwHash }).returning();
}

export async function updateUser(values: Partial<User>) {
	if (!values.id) throw TypeError('Missing User ID');
	if (values.password) values.password = await hash(values.password);
	return db.update(Users).set(values).where(eq(Users.id, values.id)).returning();
}

export async function getUser(id: string, email: string) {
	return db
		.selectDistinct()
		.from(Users)
		.where(and(eq(Users.id, id), eq(Users.email, email)));
}

export async function getUserByEmail(email: string): Promise<Maybe<User>> {
	const [user] = await db
		.selectDistinct()
		.from(Users)
		.where(and(eq(Users.email, email)));
	return user;
}

export async function authenticateUser(email: string, password: string) {
	const ret: { data: Maybe<User>; errors: Maybe<Array<string>> } = {
		data: undefined,
		errors: undefined
	};
	const [user] = await db.selectDistinct().from(Users).where(eq(Users.email, email));
	if (!user) {
		ret.errors = (ret.errors ?? []).concat(['No user found with that email.']);
		return ret;
	}
	const verified = await verify(user.password, password);
	if (!verified) {
		ret.errors = (ret.errors ?? []).concat(['Incorrect password.']);
		return ret;
	}
	ret.data = user;
	return ret;
}

export async function isEmailUnique(email: string): Promise<boolean> {
	const [user] = await db.selectDistinct().from(Users).where(eq(Users.email, email));
	return !user;
}

export async function isUsernameUnique(username: string): Promise<boolean> {
	const [user] = await db.selectDistinct().from(Users).where(eq(Users.username, username));
	return !user;
}

import { and, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Verifications, type User, type Verification } from '$lib/db/schema';
import type { Maybe } from '$lib/utils/types';

export async function createVerification(user: User) {
	return db.insert(Verifications).values({ userId: user.id, userEmail: user.email }).returning();
}

export async function getVerifications(id: string) {
	return db.selectDistinct().from(Verifications).where(eq(Verifications.id, id));
}

export async function getVerificationForUser(user: User): Promise<Maybe<Verification>> {
	const [verification] = await db
		.selectDistinct()
		.from(Verifications)
		.where(and(eq(Verifications.userEmail, user.email), eq(Verifications.userId, user.id)));
	return verification;
}

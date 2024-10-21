import { randomBytes } from 'crypto';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { Verifications, type User, type Verification } from '$lib/db/schema';
import type { Maybe } from '$lib/utils/types';
import { updateUser } from './users';

export async function createVerification(user: User) {
	const code = randomBytes(16).toString('hex');
	return db
		.insert(Verifications)
		.values({ code, userId: user.id, userEmail: user.email })
		.returning();
}

export async function deleteVerification(id: string) {
	return db.delete(Verifications).where(eq(Verifications.id, id));
}

export async function getVerifications(id: string) {
	return db.selectDistinct().from(Verifications).where(eq(Verifications.id, id));
}

export async function getVerificationForCode(code: string): Promise<Maybe<Verification>> {
	const [verification] = await db
		.selectDistinct()
		.from(Verifications)
		.where(eq(Verifications.code, code));
	return verification;
}

export async function getVerificationForUser(user: User): Promise<Maybe<Verification>> {
	const [verification] = await db
		.selectDistinct()
		.from(Verifications)
		.where(and(eq(Verifications.userEmail, user.email), eq(Verifications.userId, user.id)));
	return verification;
}

export async function verify(code: string, user: User): Promise<boolean> {
	// get the verification from the code
	const [verificationForCode, verificationForUser] = await Promise.all([
		getVerificationForCode(code),
		getVerificationForUser(user)
	]);
	// check that the verifications exist and match
	const isValid =
		verificationForCode && verificationForUser && verificationForCode.id === verificationForUser.id;
	// update fields on the user and delete the verification
	let isSuccess: boolean = false;
	if (isValid) {
		const verification = Object.assign({}, verificationForCode, verificationForUser);
		isSuccess = await Promise.all([
			updateUser({ id: verification.userId, verifiedEmail: verification.userEmail }),
			deleteVerification(verification.id)
		]).then(() => true);
	}
	return Boolean(isValid) && isSuccess;
}

import { randomBytes, createHash } from 'crypto'; // used for reset code
import { eq, and, gt } from 'drizzle-orm';
import { db } from '$lib/db';
import { PasswordResets, type User } from './schema';
import { getUserById, updateUser } from './users';

function getResetExpiration(): Date {
	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);
	return expiration;
}

function hashCode(code: string) {
	return createHash('sha256').update(code).digest('hex');
}

export async function createPasswordResetCode(user: User) {
	const resetCode = randomBytes(64).toString('hex');
	const hashedCode = hashCode(resetCode);

	// Delete any existing reset records for this user
	await db.delete(PasswordResets).where(eq(PasswordResets.userId, user.id));

	// Create new reset record
	await db.insert(PasswordResets).values({
		userId: user.id,
		code: hashedCode,
		expiresAt: getResetExpiration()
	});

	return resetCode;
}

export async function resetUserPassword(resetCode: string, password: string): Promise<boolean> {
	const hashedCode = hashCode(resetCode);
	const [reset] = await db
		.selectDistinct()
		.from(PasswordResets)
		.where(and(eq(PasswordResets.code, hashedCode), gt(PasswordResets.expiresAt, new Date())));
	if (!reset) return false;

	const user = await getUserById(reset.userId);
	if (!user) return false;

	await Promise.all([
		updateUser({ id: user.id, password }),
		db.delete(PasswordResets).where(eq(PasswordResets.id, reset.id))
	]);
	return true;
}

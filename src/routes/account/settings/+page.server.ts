import { fail } from '@sveltejs/kit';
import { createJWT, requireAuth, setAuthToken } from '@/lib/utils/auth';
import { accountSettingsSchema, passwordChangeSchema } from '@/lib/zod';
import { formDataToObject } from '@/lib/utils/types';
import { updateUser } from '@/lib/db/users';
import { createVerification, getVerificationForUser } from '@/lib/db/verifications';
import { getMailgunClient, sendVerificationEmail } from '@/lib/utils/email';
import { MAILGUN_API_KEY } from '$env/static/private';

export async function load(event) {
	const { user } = requireAuth(event);
	return { user };
}

export const actions = {
	edit: async (event) => {
		const { user } = requireAuth(event);
		if (!user) {
			return fail(403, { errors: ['You must be signed-in'] });
		}
		const formData = await event.request.formData();
		const fd = formDataToObject(formData);
		// get username, email, and password
		const { data, error, success } = await accountSettingsSchema(user).safeParseAsync(fd);
		if (!success || error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		// update the user
		const [updatedUser] = await updateUser({ ...data, id: user.id });
		// sign them in by creating and setting a JWT
		const token = createJWT(updatedUser);
		setAuthToken({ cookies: event.cookies, token });
		// Check if we need to verify their new email
		// Return a message to the user
		let message = 'Account updated.';
		if (updatedUser.email !== updatedUser.verifiedEmail) {
			// get existing verification, or create a new one
			let verification = await getVerificationForUser(updatedUser);
			if (!verification) {
				[verification] = await createVerification(updatedUser);
			}
			// send email
			try {
				const client = getMailgunClient(MAILGUN_API_KEY);
				await sendVerificationEmail(client, { verification, origin: event.url.origin });
			} catch (error) {
				console.error(error);
				return fail(400, {
					errors: [String(error)]
				});
			}
			message += ' Please check your email inbox for a verification link.';
		}
		return {
			success: true,
			message
		};
	},
	password: async (event) => {
		const { user } = requireAuth(event);
		if (!user) {
			return fail(403, { errors: ['You must be signed-in'] });
		}
		const formData = await event.request.formData();
		const fd = formDataToObject(formData);
		// get username, email, and password
		const { data, error, success } = await passwordChangeSchema.safeParseAsync(fd);
		if (!success || error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		// update the user
		await updateUser({ ...data, id: user.id });
		return {
			success: true,
			message: 'Password updated'
		};
	}
};

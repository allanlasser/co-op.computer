import { fail } from '@sveltejs/kit';
import { createJWT, requireAuth, setAuthToken } from '@/lib/utils/auth';
import { accountSettingsSchema, passwordChangeSchema } from '@/lib/zod';
import { formDataToObject } from '@/lib/utils/types';
import { updateUser } from '@/lib/db/users';

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
		return {
			success: true,
			message: 'Account updated'
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

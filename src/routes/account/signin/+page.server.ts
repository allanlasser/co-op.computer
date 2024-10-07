import { fail, redirect } from '@sveltejs/kit';
import { signInSchema } from '$lib/zod';
import { authenticateUser } from '$lib/db/users';
import { createJWT, getAuthPayload, setAuthToken } from '$lib/utils/auth';
import { formDataToObject } from '$lib/utils/types';

export async function load({ cookies }) {
	if (getAuthPayload({ cookies })) {
		return redirect(301, '/');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const fd = formDataToObject(formData);
		// validate incoming data
		const { data, error } = await signInSchema.safeParseAsync(fd);
		if (error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		// authenticate the user
		const { email, password } = data;
		const { data: user, errors: authErrors } = await authenticateUser(email, password);
		if (!user) {
			return fail(400, {
				errors: authErrors ?? ['Failed to authenticate']
			});
		}
		// sign them in by creating and setting a JWT
		const token = createJWT(user);
		setAuthToken({ cookies, token });
		// redirect to the homepage
		redirect(301, '/');
	}
};

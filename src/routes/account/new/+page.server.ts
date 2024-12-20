import { acceptInvitation } from '$lib/db/invitations';
import { createUser } from '$lib/db/users';
import { createJWT, getAuthPayload, setAuthToken } from '$lib/utils/auth';
import { formDataToObject } from '$lib/utils/types';
import { signUpSchema } from '$lib/zod';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
	if (getAuthPayload({ cookies })) {
		const nextUrl = url.searchParams.get('then') ?? '/';
		return redirect(301, nextUrl);
	}
	return {
		invitation: url.searchParams.get('invitation')
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const fd = formDataToObject(formData);
		// validate incoming data
		const { data, error, success } = await signUpSchema.safeParseAsync(fd);
		if (!success || error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		// create the user
		const [user] = await createUser(data.email, data.username, data.password);
		// accept the invitation
		try {
			await acceptInvitation(data.invitation, user);
		} catch (error) {
			return fail(400, { errors: [String(error)] });
		}
		// sign them in by creating and setting a JWT
		const token = createJWT(user);
		setAuthToken({ cookies, token });
		return { success: true };
	}
};

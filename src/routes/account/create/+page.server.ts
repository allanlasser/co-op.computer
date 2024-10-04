import { signIn } from '$lib/auth.js';
import { createUser } from '$lib/db/users.js';
import { formDataToObject } from '$lib/utils/types.js';
import { signUpSchema } from '$lib/zod';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, ...rest }) => {
		console.log('post');
		const formData = await request.formData();
		const fd = formDataToObject(formData);
		// validate
		const { data, error } = signUpSchema.safeParse(fd);
		console.log(data, error);
		if (error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		// create the user
		console.log(data);
		await createUser(data.email, data.username, data.password);
		await signIn({ request, ...rest });
		redirect(301, '/');
	}
};

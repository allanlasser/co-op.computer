import { resetUserPassword } from '@/lib/db/passwordReset';
import { formDataToObject } from '@/lib/utils/types';
import { passwordResetSchema } from '@/lib/zod';
import { fail } from '@sveltejs/kit';

export async function load(event) {
	const code = event.url.searchParams.get('code');
	return { code };
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const fd = formDataToObject(formData);
		const { data, error } = passwordResetSchema.safeParse(fd);
		if (error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}
		const { code, password } = data;
		const success = await resetUserPassword(code, password);
		return { success, errors: success ? undefined : ['Invalid reset code'] };
	}
};

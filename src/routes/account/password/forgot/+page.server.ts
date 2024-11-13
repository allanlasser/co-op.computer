import { fail } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/db/users';
import { EMAIL_DOMAIN, getMailgunClient, renderTemplate, SYSTEM_SENDER } from '$lib/utils/email';
import PasswordResetEmail from '$lib/components/email/PasswordReset.svelte';
import { MAILGUN_API_KEY } from '$env/static/private';
import { formDataToObject } from '@/lib/utils/types';
import { forgotPasswordSchema } from '@/lib/zod';
import { createPasswordResetCode } from '@/lib/db/passwordReset';

export const actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const { data, error, success } = forgotPasswordSchema.safeParse(formDataToObject(formData));

		if (!success || error) {
			return fail(400, {
				errors: error.flatten().fieldErrors
			});
		}

		const { email } = data;
		const user = await getUserByEmail(email);
		if (!user) {
			return { success: true }; // Always return success
		}

		// Generate reset token and hash
		const resetCode = await createPasswordResetCode(user);

		// Send reset email
		try {
			const client = getMailgunClient(MAILGUN_API_KEY);
			const { html, text } = renderTemplate(PasswordResetEmail, {
				origin: url.origin,
				code: resetCode
			});

			await client.messages.create(EMAIL_DOMAIN, {
				from: SYSTEM_SENDER,
				to: [email],
				subject: 'Reset your password',
				html,
				text
			});
		} catch (error) {
			console.error('Failed to send reset email:', error);
		}

		return { success: true };
	}
};

import { fail } from '@sveltejs/kit';
import VerificationEmail from '$lib/components/email/Verification.svelte';
import { createVerification, getVerificationForUser, verify } from '$lib/db/verifications';
import { requireAuth, userIsVerified } from '$lib/utils/auth';
import { getVerificationPath } from '$lib/utils/routes';
import { EMAIL_DOMAIN, getMailgunClient, renderTemplate, SYSTEM_SENDER } from '$lib/utils/email';
import { MAILGUN_API_KEY } from '$env/static/private';

export async function load(event) {
	const { user } = requireAuth(event);
	const code = event.url.searchParams.get('code');
	let isVerified = userIsVerified(user);
	if (!isVerified && code) {
		const verified = await verify(code, user);
		isVerified = verified;
	}
	return {
		isVerified
	};
}

export const actions = {
	default: async (event) => {
		const { user } = event.locals.session ?? {};
		if (!user) {
			return fail(403, {
				errors: ['You must be signed-in']
			});
		}
		if (userIsVerified(user)) {
			return fail(400, {
				errors: ['You are already verified']
			});
		}
		// get existing verification, or create a new one
		let verification = await getVerificationForUser(user);
		if (!verification) {
			[verification] = await createVerification(user);
		}
		// create href for the verification page
		const href = new URL(getVerificationPath(verification), event.url.origin).href;
		// send email
		try {
			const { html, text } = renderTemplate(VerificationEmail, { href });
			const client = getMailgunClient(MAILGUN_API_KEY);
			const result = await client.messages.create(EMAIL_DOMAIN, {
				from: SYSTEM_SENDER,
				to: [verification.userEmail],
				subject: 'Please verify your email',
				html,
				text
			});
			console.log(result);
			return {
				success: true,
				message: 'Sent! Check your email for the verification link'
			};
		} catch (error) {
			console.error(error);
			return fail(400, {
				errors: [String(error)]
			});
		}
	}
};

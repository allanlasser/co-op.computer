import { fail } from '@sveltejs/kit';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { MAILGUN_API_KEY } from '$env/static/private';
import { render } from 'svelty-email';
import VerificationEmail from '$lib/email/Verification.svelte';
import { createVerification, getVerificationForUser, verify } from '$lib/db/verifications';
import { requireAuth, userIsVerified } from '$lib/utils/auth';
import { getVerificationPath } from '$lib/utils/routes';

function getMailgunClient() {
	const mailgun = new Mailgun(FormData);
	return mailgun.client({ username: 'api', key: MAILGUN_API_KEY });
}

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
			const html = render({ template: VerificationEmail, props: { href } });
			const text = render({
				template: VerificationEmail,
				props: { href },
				options: { plainText: true }
			});
			const mailgunClient = getMailgunClient();
			await mailgunClient.messages.create('email.co-op.computer', {
				to: [verification.userEmail],
				from: 'CO-OP <system@email.co-op.computer>',
				subject: 'Please verify your email',
				text,
				html
			});
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

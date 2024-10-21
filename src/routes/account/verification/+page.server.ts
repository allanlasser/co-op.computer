import { createVerification, getVerificationForUser, verify } from '$lib/db/verifications';
import { requireAuth, userIsVerified } from '$lib/utils/auth';
import { getVerificationPath } from '$lib/utils/routes';
import { fail } from '@sveltejs/kit';

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
		console.log('send email to: ', verification.userEmail);
		console.log('with href: ', href);

		return {
			success: true,
			message: 'Please check your email for the verification link'
		};
	}
};

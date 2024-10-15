import { getUser } from '$lib/db/users';
import { getAuthPayload, type Payload } from '$lib/utils/auth';

function hasUserData(authPayload: Payload): authPayload is { id: string; email: string } {
	return (
		Boolean(authPayload) &&
		typeof authPayload === 'object' &&
		'id' in authPayload &&
		'email' in authPayload
	);
}

export async function handle({ event, resolve }) {
	try {
		// get user data from the auth token
		const authPayload = getAuthPayload({ cookies: event.cookies });
		if (hasUserData(authPayload)) {
			// add the user session to the event data
			const [user] = await getUser(authPayload.id, authPayload.email);
			if (user) {
				event.locals.session = { user };
			}
		} else {
			// remove the session from the event data
			event.locals.session = undefined;
		}
	} catch (error) {
		console.error(error);
	}
	return await resolve(event);
}

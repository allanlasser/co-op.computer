import { fail } from '@sveltejs/kit';
import { acceptInvitation } from '$lib/db/invitations';
import { enlargeUUID } from '$lib/utils/routes';

export const actions = {
	accept: async (event) => {
		const { user } = event.locals.session ?? {};
		if (!user) return fail(403, { errors: ['Not Authorized'] });
		try {
			await acceptInvitation(enlargeUUID(event.params.shortId), user);
		} catch (error) {
			return fail(400, { errors: [String(error)] });
		}
		return { success: true };
	}
};

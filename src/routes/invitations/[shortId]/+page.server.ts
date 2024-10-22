import { fail } from '@sveltejs/kit';
import { acceptInvitation, getInvitation } from '$lib/db/invitations';
import { enlargeUUID } from '$lib/utils/routes';
import { getUser } from '$lib/db/users';
import { sendInvitationEmail } from '$lib/utils/email';

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
	},
	resend: async (event) => {
		const { user } = event.locals.session ?? {};
		const {
			invitations: invitation,
			users: fromUser,
			groups: toGroup
		} = await getInvitation(enlargeUUID(event.params.shortId));
		if (user?.id !== fromUser.id) {
			return fail(403, { errors: ['Unauthorized'] });
		}
		const [toUser] = invitation.toUserId
			? await getUser(invitation.toUserId, invitation.toEmail)
			: [undefined];
		try {
			await sendInvitationEmail({
				origin: event.url.origin,
				invitation,
				fromUser,
				toGroup,
				toUser
			});
		} catch (error) {
			console.error(error);
			return fail(500, { errors: [String(error)] });
		}
		return { success: true, message: `Resent invitation to ${invitation.toEmail}` };
	}
};

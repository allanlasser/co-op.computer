import { fail } from '@sveltejs/kit';
import { acceptInvitation, deleteInvitation, getInvitation } from '$lib/db/invitations';
import { enlargeUUID } from '$lib/utils/routes';
import { getUser } from '$lib/db/users';
import { getMailgunClient, sendInvitationEmail } from '$lib/utils/email';
import { MAILGUN_API_KEY } from '$env/static/private';

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
	revoke: async (event) => {
		// Delete the invitation
		const { user } = event.locals.session ?? {};
		const { invitations: invitation, users: fromUser } = await getInvitation(
			enlargeUUID(event.params.shortId)
		);
		if (user?.id !== fromUser.id) {
			return fail(403, { errors: ['Unauthorized'] });
		}
		await deleteInvitation(invitation.id);
		return { success: true, message: `Revoked invitation to ${invitation.toEmail}` };
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
			const client = getMailgunClient(MAILGUN_API_KEY);
			await sendInvitationEmail(client, {
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

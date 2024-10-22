import FormData from 'form-data';
import Mailgun, { type MessagesSendResult } from 'mailgun.js';
import type { ComponentProps, ComponentType } from 'svelte';
import { render } from 'svelty-email';
import { MAILGUN_API_KEY } from '$env/static/private';
import VerificationEmail from '$lib/components/email/Verification.svelte';
import InvitationEmail from '$lib/components/email/Invitation.svelte';

export const EMAIL_DOMAIN = 'email.co-op.computer';

export const SYSTEM_SENDER = 'CO-OP <system@email.co-op.computer>';

export function renderTemplate<T extends ComponentType>(
	template: T,
	props: Record<string, unknown>
) {
	const html = render({ template, props });
	const text = render({
		template,
		props,
		options: { plainText: true }
	});
	return {
		html,
		text
	};
}

export function getMailgunClient(key = MAILGUN_API_KEY) {
	if (!key) throw TypeError('Missing Mailgun API key');
	const mailgun = new Mailgun(FormData);
	return mailgun.client({ username: 'api', key });
}

export async function sendVerificationEmail(
	props: ComponentProps<VerificationEmail>
): Promise<MessagesSendResult> {
	const { html, text } = renderTemplate(VerificationEmail, props);
	const client = getMailgunClient(MAILGUN_API_KEY);
	return client.messages.create(EMAIL_DOMAIN, {
		from: SYSTEM_SENDER,
		to: [props.verification.userEmail],
		subject: 'Please verify your email',
		html,
		text
	});
}

export async function sendInvitationEmail(
	props: ComponentProps<InvitationEmail>
): Promise<MessagesSendResult> {
	const { html, text } = renderTemplate(InvitationEmail, props);
	const client = getMailgunClient(MAILGUN_API_KEY);
	return client.messages.create(EMAIL_DOMAIN, {
		from: SYSTEM_SENDER,
		to: [props.invitation.toEmail],
		subject: `You're invited to join ${props.fromUser.username}'s group on CO-OP`,
		html,
		text
	});
}

import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import type { ComponentType } from 'svelte';
import { render } from 'svelty-email';

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

export function getMailgunClient(key = process.env.MAILGUN_API_KEY) {
	if (!key) throw TypeError('Missing Mailgun API key');
	const mailgun = new Mailgun(FormData);
	return mailgun.client({ username: 'api', key });
}

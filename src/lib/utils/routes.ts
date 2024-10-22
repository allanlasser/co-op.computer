import type { Verification } from '$lib/db/schema';
import shortUUID from 'short-uuid';

interface Identified {
	id: string;
}

export function shortenUUID(uuid: string) {
	const translator = shortUUID();
	return translator.fromUUID(uuid);
}

export function enlargeUUID(shortId: string): string {
	const translator = shortUUID();
	return translator.toUUID(shortId);
}

export function getGroupPath(group: Identified) {
	return `/groups/${shortenUUID(group.id)}`;
}

export function getToolPath(tool: Identified) {
	return `/tools/${shortenUUID(tool.id)}`;
}

export function getInvitationPath(invitation: Identified) {
	return `/invitations/${shortenUUID(invitation.id)}`;
}

export function getVerificationPath(verification: Verification) {
	return `/account/verification/?code=${verification.code}`;
}

import type { Group, Tool, Verification } from '$lib/db/schema';
import shortUUID from 'short-uuid';

export function shortenUUID(uuid: string) {
	const translator = shortUUID();
	return translator.fromUUID(uuid);
}

export function enlargeUUID(shortId: string): string {
	const translator = shortUUID();
	return translator.toUUID(shortId);
}

export function getGroupPath(group: Group) {
	return `/groups/${shortenUUID(group.id)}`;
}

export function getToolPath(tool: Tool) {
	return `/tools/${shortenUUID(tool.id)}`;
}

export function getVerificationPath(verification: Verification) {
	return `/account/verification/?code=${verification.code}`;
}

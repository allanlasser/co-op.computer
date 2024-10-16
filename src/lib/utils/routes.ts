import type { Tool } from '$lib/db/schema';
import shortUUID from 'short-uuid';

export function shortenUUID(uuid: string) {
	const translator = shortUUID();
	return translator.fromUUID(uuid);
}

export function enlargeUUID(shortId: string): string {
	const translator = shortUUID();
	return translator.toUUID(shortId);
}

export function getToolPath(tool: Tool) {
	return `/tools/${shortenUUID(tool.id)}`;
}

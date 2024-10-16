import { getTool } from '$lib/db/tools';
import { enlargeUUID } from '$lib/utils/routes';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const { shortId } = event.params;
	const uuid = enlargeUUID(shortId);
	const [tool] = await getTool(uuid);
	if (!tool) {
		throw error(404, 'Tool not found');
	}
	return {
		tool
	};
}

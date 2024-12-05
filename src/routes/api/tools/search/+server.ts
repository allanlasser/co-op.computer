import { error } from '@sveltejs/kit';
import { requireAuth } from '@/lib/utils/auth';
import type { RequestHandler } from './$types';
import { searchAvailableTools } from '@/lib/db/tools';

export const GET: RequestHandler = async (event) => {
	const { user } = requireAuth(event);
	const query = event.url.searchParams.get('query');
	if (!query) {
		return error(400, 'Query parameter is required');
	}
	const tools = await searchAvailableTools(user.id, query);
	return new Response(JSON.stringify(tools), {
		headers: {
			'content-type': 'application/json'
		}
	});
};

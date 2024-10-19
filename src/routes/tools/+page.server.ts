import { getTools } from '$lib/db/tools';
import { requireAuth } from '$lib/utils/auth';

export async function load(event) {
	const session = requireAuth(event);
	return {
		session,
		tools: getTools()
	};
}

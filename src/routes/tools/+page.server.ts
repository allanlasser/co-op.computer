import { getTools } from '$lib/db/tools';

export async function load(event) {
	const session = event.locals.session;
	return {
		session,
		tools: getTools()
	};
}

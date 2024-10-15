import { fail, redirect } from '@sveltejs/kit';
import { createTool } from '$lib/db/tools';

export async function load(event) {
	const session = event.locals.session;
	const nextUrl = event.url.pathname;
	if (!session) {
		return redirect(302, `/account/signin?then=${encodeURIComponent(nextUrl)}`);
	}
	return {};
}

export const actions = {
	default: async ({ request, locals }) => {
		const user = locals.session?.user;
		if (!user) {
			return fail(403, {
				errors: 'You must be signed in to add a new tool.'
			});
		}
		const data = await request.formData();
		const name = String(data.get('name'));
		const newTool = await createTool({ name, ownerId: user.id });
		return { success: true, data: { ...newTool } };
	}
};

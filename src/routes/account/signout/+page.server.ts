import { clearAuthToken } from '$lib/utils/auth.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	clearAuthToken({ cookies });
	return redirect(302, '/');
}

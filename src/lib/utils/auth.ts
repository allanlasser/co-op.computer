import jwt, { type JwtPayload } from 'jsonwebtoken';
import { redirect, type Cookies, type RequestEvent } from '@sveltejs/kit';
import { type User } from '$lib/db/schema';

export const AUTH_COOKIE = 'AuthorizationToken';

export type Payload = JwtPayload | string | undefined;

function getAuthSecret(): string {
	const secret = process.env.AUTH_SECRET;
	if (!secret) throw new Error('Missing AUTH_SECRET');
	return secret;
}

export function createJWT(user: User): string {
	const secret = getAuthSecret();
	return jwt.sign({ id: user.id, email: user.email }, secret, {
		expiresIn: '1d'
	});
}

export function setAuthToken({ cookies, token }: { cookies: Cookies; token: string }): void {
	cookies.set(AUTH_COOKIE, `Bearer ${token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/'
	});
}

export function getAuthPayload({ cookies }: { cookies: Cookies }): Payload {
	const authCookie = cookies.get(AUTH_COOKIE);
	let payload = undefined;
	if (authCookie) {
		const secret = getAuthSecret();
		const token = authCookie.split(' ')[1];
		payload = jwt.verify(token, secret);
	}
	return payload;
}

export function clearAuthToken({ cookies }: { cookies: Cookies }): void {
	cookies.delete(AUTH_COOKIE, {
		path: '/'
	});
}

export function requireAuth(event: RequestEvent): { user: User } {
	const session = event.locals.session;
	const nextUrl = event.url.pathname;
	if (!session) {
		throw redirect(302, `/account/signin?then=${encodeURIComponent(nextUrl)}`);
	}
	return session;
}

import { getUser, type User } from '$lib/db/users';
import { type Nullable } from '$lib/utils/types';
import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { hash } from 'argon2';
import { signInSchema } from './zod';
import { ZodError } from 'zod';

declare module '@auth/sveltekit' {
	interface Session {
		user: User & DefaultSession['user'];
	}
}

export const { signIn, signOut, handle } = SvelteKitAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials): Promise<Nullable<User>> => {
				try {
					let user: Nullable<User> = null;
					const { email, password } = await signInSchema.parseAsync(credentials);
					const pwHash = await hash(password);
					[user] = await getUser(email, pwHash);
					if (!user) throw new Error('User not found.');
					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
					return null;
				}
			}
		})
	]
});

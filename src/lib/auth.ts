import { getUser, type User } from '$lib/db/users';
import { type Nullable } from '$lib/utils/types';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { signInSchema } from './zod';
import { ZodError } from 'zod';
import { config } from 'dotenv';

const isTest = process.env.NODE_ENV === 'test';
const envPath = isTest ? '.env.test' : '.env.development.local';
config({ path: envPath });

declare module '@auth/sveltekit' {
	interface Session {
		user: User;
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
					[user] = await getUser(email, password);
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
	],
	secret: process.env.AUTH_SECRET
});

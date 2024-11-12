import { object, string } from 'zod';
import { isEmailUnique, isUsernameUnique } from './db/users';
import type { User } from './db/schema';
import { isInvitationValid } from './db/invitations';

export const accountSettingsSchema = (user: User) =>
	object({
		email: string({ required_error: 'Email is required' })
			.min(1, 'Email is required')
			.email('Invalid email')
			.refine(
				async (email) => {
					if (email === user.email) return true;
					return await isEmailUnique(email);
				},
				{
					message: 'Email is already in use'
				}
			),
		username: string({ required_error: 'Username is required' })
			.min(2, 'Username must be at least two characters')
			.max(30, 'Usernames must be no longer than 30 characters')
			.refine(
				async (username) => {
					if (username === user.username) return true;
					return await isUsernameUnique(username);
				},
				{
					message: 'Username is already in use'
				}
			)
	});

export const passwordChangeSchema = object({
	password: string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
	confirmPassword: string()
}).refine((data) => data.password === data.confirmPassword, {
	path: ['confirmPassword'], // Specify the field that will display the error
	message: 'Passwords do not match'
});

export const signUpSchema = object({
	invitation: string({ required_error: 'Invitation is required' })
		.min(1, 'Invitation is required')
		.refine(async (invitation) => await isInvitationValid(invitation), {
			message: 'Invalid invitation code'
		}),
	email: string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Invalid email')
		.refine(async (email) => await isEmailUnique(email), {
			message: 'Email is already in use'
		}),
	username: string({ required_error: 'Username is required' })
		.min(2, 'Username must be at least two characters')
		.max(30, 'Usernames must be no longer than 30 characters')
		.refine(async (username) => await isUsernameUnique(username), {
			message: 'Username is already in use'
		}),
	password: string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
	confirmPassword: string()
}).refine((data) => data.password === data.confirmPassword, {
	path: ['confirmPassword'], // Specify the field that will display the error
	message: 'Passwords do not match'
});

export const signInSchema = object({
	email: string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Invalid email'),
	password: string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters')
});

import { object, string } from 'zod';

export const signUpSchema = object({
	email: string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Invalid email'),
	username: string({ required_error: 'Username is required' })
		.min(2, 'Username must be at least two characters')
		.max(30, 'Usernames must be no longer than 30 characters'),
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

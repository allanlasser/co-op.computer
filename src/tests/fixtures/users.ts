import type { User } from '$lib/db/schema';

export const user: User = {
	id: 'user-1',
	email: 'user1@example.com',
	username: 'user1',
	password: 'hashedpassword1',
	ordinal: 1,
	createdAt: new Date('2023-01-01T12:00:00Z'),
	verifiedEmail: 'user1@example.com'
};

export const users: User[] = [
	{
		id: 'user-1',
		email: 'user1@example.com',
		username: 'user1',
		password: 'hashedpassword1',
		ordinal: 1,
		createdAt: new Date('2023-01-01T12:00:00Z'),
		verifiedEmail: 'user1@example.com'
	},
	{
		id: 'user-2',
		email: 'user2@example.com',
		username: 'user2',
		password: 'hashedpassword2',
		ordinal: 2,
		createdAt: new Date('2023-02-01T12:00:00Z'),
		verifiedEmail: 'user2@example.com'
	},
	{
		id: 'user-3',
		email: 'user3@example.com',
		username: 'user3',
		password: 'hashedpassword3',
		ordinal: 3,
		createdAt: new Date('2023-03-01T12:00:00Z'),
		verifiedEmail: 'user3@example.com'
	}
];

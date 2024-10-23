import type { Verification } from '$lib/db/schema';

export const verification: Verification = {
	id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
	createdAt: new Date('2023-10-01T12:00:00Z'),
	code: 'ABC123',
	userId: 'user-1',
	userEmail: 'user1@example.com'
};

export const verifications: Verification[] = [
	{
		id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
		createdAt: new Date('2023-10-01T12:00:00Z'),
		code: 'ABC123',
		userId: 'user-1',
		userEmail: 'user1@example.com'
	},
	{
		id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
		createdAt: new Date('2023-10-02T12:00:00Z'),
		code: 'DEF456',
		userId: 'user-2',
		userEmail: 'user2@example.com'
	},
	{
		id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
		createdAt: new Date('2023-10-03T12:00:00Z'),
		code: 'GHI789',
		userId: 'user-3',
		userEmail: 'user3@example.com'
	}
];

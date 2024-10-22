import type { Invitation } from '$lib/db/schema';

export const invitation: Invitation = {
	id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
	createdAt: new Date('2023-10-01T12:00:00Z'),
	fromUserId: 'user-1',
	toGroupId: 'group-1',
	toUserId: 'user-2',
	toEmail: 'invitee@example.com',
	accepted: false
};

export const invitations: Invitation[] = [
	{
		id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		createdAt: new Date('2023-10-01T12:00:00Z'),
		fromUserId: 'user-1',
		toGroupId: 'group-1',
		toUserId: 'user-2',
		toEmail: 'invitee@example.com',
		accepted: false
	},
	{
		id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		createdAt: new Date('2023-10-02T12:00:00Z'),
		fromUserId: 'user-3',
		toGroupId: 'group-2',
		toUserId: null,
		toEmail: 'anotherinvitee@example.com',
		accepted: true
	}
];

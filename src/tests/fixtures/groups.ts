import type { Group } from '$lib/db/schema';

export const group: Group = {
	id: 'group-1',
	name: 'Group One',
	createdAt: new Date('2023-01-15T12:00:00Z')
};

export const groups: Group[] = [
	{
		id: 'group-1',
		name: 'Group One',
		createdAt: new Date('2023-01-15T12:00:00Z')
	},
	{
		id: 'group-2',
		name: 'Group Two',
		createdAt: new Date('2023-02-15T12:00:00Z')
	}
];

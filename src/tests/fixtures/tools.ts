import type { Tool } from '$lib/db/schema';

export const tool: Tool = {
	id: 'a1b2c3d4e5f6',
	name: 'Hammer',
	ownerId: 'a1b2c3d4e5f6',
	createdAt: new Date()
};

export const tools: Tool[] = [
	{
		id: 'a1b2c3d4e5f6',
		name: 'Hammer',
		ownerId: 'a1b2c3d4e5f6',
		createdAt: new Date()
	},
	{
		id: 'b2c3d4e5f6a1',
		name: 'Screwdriver',
		ownerId: 'a1b2c3d4e5f6',
		createdAt: new Date()
	},
	{
		id: 'c3d4e5f6a1b2',
		name: 'Wrench',
		ownerId: 'a1b2c3d4e5f6',
		createdAt: new Date()
	}
];

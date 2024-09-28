import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.development.local' });

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/db/schema.ts',
	out: './.drizzle',
	breakpoints: true,
	strict: true,
	dbCredentials: {
		url: process.env.POSTGRES_URL!
	}
});

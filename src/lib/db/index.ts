import { config } from 'dotenv';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

config({ path: '.env.development.local' });

export const db = drizzle(sql);
export default db;

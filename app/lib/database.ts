import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// (1149) our db instance established here:
const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle({ client });
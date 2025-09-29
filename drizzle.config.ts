import 'dotenv/config';
import type { Config } from "drizzle-kit";

export default {
  schema: "./app/lib/auth-schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;

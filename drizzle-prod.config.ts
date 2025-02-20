import { defineConfig } from "drizzle-kit";
import 'dotenv/config';

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.PROD_POSTGRES_HOST!,
		port: 5432,
		user: process.env.PROD_POSTGRES_USER!,
		password: process.env.PROD_POSTGRES_PASSWORD!,
		database: process.env.PROD_POSTGRES_DATABASE!,
		ssl: 'prefer',
	},
});

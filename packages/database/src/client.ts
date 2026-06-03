import { join } from "node:path";

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as authSchema from "./schema/auth/auth.schema.js";
import * as analyticsSchema from "./schema/analytics/index.js";

config({
  path: join(process.cwd(), ".env"),
  quiet: true,
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize @traqory/database");
}

export const sql = postgres(databaseUrl, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(sql, {
  schema: {
    ...authSchema,
    ...analyticsSchema,
  },
});

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as authSchema from "./schema/auth/auth.schema.js";
import * as analyticsSchema from "./schema/analytics/index.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required",
  );
}

export const sql = postgres(
  databaseUrl,
  {
    max: 5,
    idle_timeout: 30,
    connect_timeout: 30,
  },
);

export const db = drizzle(sql, {
  schema: {
    ...authSchema,
    ...analyticsSchema,
  },
});
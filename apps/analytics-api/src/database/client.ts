import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "../config/env.js";
import * as apiKeySchema from "./schema/api-key.schema.js";
import * as websiteSchema from "./schema/website.schema.js";

const schema = {
  ...websiteSchema,
  ...apiKeySchema,
};

export const queryClient = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient, { schema });

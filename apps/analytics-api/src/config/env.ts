import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { z } from "zod";

config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
  quiet: true,
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3002),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string().min(1),
  AUTH_SERVICE_URL: z.string().url().default("http://localhost:3001"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);

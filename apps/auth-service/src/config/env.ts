import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().positive().default(3001),

  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string().min(1),

  BETTER_AUTH_SECRET: z.string().min(32),

  BETTER_AUTH_URL: z.string().url(),

  CORS_ORIGIN: z.string().url(),
});

export const env = envSchema.parse(process.env);

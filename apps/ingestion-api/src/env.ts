import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  INGESTION_API_PORT: z.coerce.number().default(4000),
});

export const env = envSchema.parse(process.env);
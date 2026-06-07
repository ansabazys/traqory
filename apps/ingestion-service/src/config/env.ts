import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  INGESTION_SERVICE_PORT: z.coerce.number().default(3003),
});

export const env = envSchema.parse(process.env);
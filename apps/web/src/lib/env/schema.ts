import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum([
    "development",
    "production",
    "test",
  ]),

  NEXT_PUBLIC_APP_URL: z.url(),

  NEXT_PUBLIC_AUTH_API_URL: z.url(),

  NEXT_PUBLIC_ANALYTICS_API_URL: z.url(),
});

export type Env = z.infer<
  typeof envSchema
>;
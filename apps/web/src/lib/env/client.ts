import { envSchema } from "./schema";

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,

  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL,

  NEXT_PUBLIC_AUTH_API_URL:
    process.env
      .NEXT_PUBLIC_AUTH_API_URL,

  NEXT_PUBLIC_ANALYTICS_API_URL:
    process.env
      .NEXT_PUBLIC_ANALYTICS_API_URL,
});
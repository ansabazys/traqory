import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../database/client.js";
import { env } from "./env.js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

   emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
  ],
});

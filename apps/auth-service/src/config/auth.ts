import { betterAuth } from "better-auth";
import { env } from "./env.js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },
});
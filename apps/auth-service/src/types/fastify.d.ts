import type { auth } from "../config/auth.js";

type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

declare module "fastify" {
  interface FastifyRequest {
    authSession: AuthSession;
    user: NonNullable<AuthSession>["user"] | null;
  }
}

import type { FastifyInstance } from "fastify";

export async function authRoutes(
  app: FastifyInstance
) {
  app.get("/auth/test", async () => {
    return {
      message: "Auth module ready",
    };
  });
}
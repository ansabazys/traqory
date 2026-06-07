import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export async function rateLimitPlugin(
  app: FastifyInstance,
) {
  await app.register(rateLimit, {
    max: 1000,
    timeWindow: "1 minute",
  });
}
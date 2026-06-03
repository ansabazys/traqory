import type { FastifyInstance } from "fastify";

const windowMs = 60_000;
const maxRequests = 120;
const buckets = new Map<string, { count: number; resetAt: number }>();

export async function rateLimitMiddleware(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    const now = Date.now();
    const key = request.ip;
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return;
    }

    bucket.count += 1;

    if (bucket.count > maxRequests) {
      return reply.status(429).send({
        error: "Too Many Requests",
        message: "Rate limit exceeded",
      });
    }
  });
}

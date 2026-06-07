import type { FastifyInstance } from "fastify";

import { analyticsRoutes } from "./routes/analytics.routes.js";

export async function analyticsModule(app: FastifyInstance) {
  await app.register(analyticsRoutes);
}

import type { FastifyInstance } from "fastify";

import { resolveSession } from "../middleware/auth.middleware.js";

export async function authPlugin(app: FastifyInstance) {
  app.decorateRequest("authSession", null);
  app.decorateRequest("user", null);

  app.addHook("preHandler", async (request) => {
    if (request.url === "/health" || request.url.startsWith("/api/auth/")) {
      return;
    }

    await resolveSession(request);
  });
}

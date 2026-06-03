import type { FastifyInstance } from "fastify";

import { requireAuth } from "../../../middleware/auth.middleware.js";
import { websiteController } from "../controllers/website.controller.js";

export async function websiteRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.post("/websites", websiteController.createWebsite);
  app.get("/websites", websiteController.listWebsites);
  app.get("/websites/:id", websiteController.getWebsite);
  app.patch("/websites/:id", websiteController.updateWebsite);
  app.delete("/websites/:id", websiteController.deleteWebsite);

  app.post("/websites/:id/api-keys", websiteController.createApiKey);
  app.get("/websites/:id/api-keys", websiteController.listApiKeys);
  app.delete("/api-keys/:id", websiteController.revokeApiKey);
  app.post("/api-keys/:id/rotate", websiteController.rotateApiKey);

  app.get("/me", async (request) => {
  return request.user;
});
}

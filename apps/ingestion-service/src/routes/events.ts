import { FastifyInstance } from "fastify";

import { BatchSchema } from "../schemas/event.schema.js";
import { validateApiKey } from "../services/api-key.service.js";

export async function eventsRoutes(
  app: FastifyInstance,
) {
  app.post("/", async (req, reply) => {
    const body = BatchSchema.parse(req.body);

    const key = await validateApiKey(
      body.apiKey,
    );

    if (!key) {
      return reply.status(401).send({
        success: false,
        message: "Invalid API key",
      });
    }

    return reply.status(202).send({
      success: true,
      websiteId: key.websiteId,
      received: body.events.length,
    });
  });
}
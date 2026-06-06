import { FastifyInstance } from "fastify";
import { BatchSchema } from "../schemas/event.schema";
import { validateApiKey } from "../services/project.service";

export async function eventsRoutes(
  app: FastifyInstance
) {
  app.post("/", async (req, reply) => {
    const body = BatchSchema.parse(req.body);

    const project =
      await validateApiKey(body.apiKey);

    if (!project) {
      return reply.status(401).send({
        success: false,
        message: "Invalid API key",
      });
    }

    return reply.status(202).send({
      success: true,
      projectId: project.id,
      received: body.events.length,
    });
  });
}
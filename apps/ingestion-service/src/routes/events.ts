import { FastifyInstance } from "fastify";
import { BatchSchema } from "../schemas/event.schema";

export async function eventsRoutes(
  app: FastifyInstance
) {
  app.post("/", async (req, reply) => {
    const body =
      BatchSchema.parse(req.body);

    return reply.status(202).send({
      success: true,
      received: body.events.length,
    });
  });
}
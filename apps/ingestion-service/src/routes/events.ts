import { FastifyInstance } from 'fastify';

import { BatchSchema } from '../schemas/event.schema.js';
import { validateApiKey } from '../services/api-key.service.js';
import { enrichEvent } from '../services/event.service.js';
import { enqueueEvents } from '../services/queue.service.js';

export async function eventsRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const result = BatchSchema.safeParse(req.body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        code: 'VALIDATION_ERROR',
        errors: result.error.issues,
      });
    }

    const body = result.data;

    const key = await validateApiKey(body.apiKey);

    if (!key) {
      return reply.status(401).send({
        success: false,
        message: 'Invalid API key',
      });
    }

    const enrichedEvents = body.events.map((event) =>
      enrichEvent(event, {
        websiteId: key.websiteId,
        ip: req.ip,
        userAgent: req.headers['user-agent'] ?? 'unknown',
      }),
    );

    await enqueueEvents(enrichedEvents);

    app.log.info(enrichedEvents);

    return reply.status(202).send({
      success: true,
      websiteId: key.websiteId,
      received: body.events.length,
    });
  });
}

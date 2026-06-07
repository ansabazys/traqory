import { FastifyInstance } from 'fastify';

import { BatchSchema } from '../schemas/event.schema.js';
import { validateApiKey } from '../services/api-key.service.js';
import { enrichEvent } from '../services/event.service.js';
import { eventsQueue } from '@traqory/queue';
import { getGeo } from '../services/geo.service.js';
import { parseUserAgent } from '../services/device.service.js';

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

    const ip = req.ip === '127.0.0.1' || req.ip === '::1' ? '8.8.8.8' : req.ip;

    const geo = await getGeo(ip);

    const userAgent = req.headers['user-agent'] ?? 'unknown';

    const device = parseUserAgent(userAgent);

    const enrichedEvents = body.events.map((event) =>
      enrichEvent(event, {
        websiteId: key.websiteId,

        ip,

        userAgent: req.headers['user-agent'] ?? 'unknown',

        browser: device.browser,

        browserVersion: device.browserVersion,

        os: device.os,

        osVersion: device.osVersion,

        deviceType: device.deviceType,

        country: geo.country,
        region: geo.region,
        city: geo.city,

        latitude: geo.latitude,
        longitude: geo.longitude,
      }),
    );

    await eventsQueue.add('track-event', enrichedEvents);

    app.log.info(enrichedEvents);

    return reply.status(202).send({
      success: true,
      websiteId: key.websiteId,
      received: body.events.length,
    });
  });
}

import { FastifyInstance } from 'fastify';

import { eventsQueue } from '@traqory/queue';

import { BatchSchema } from '../schemas/event.schema.js';
import { validateApiKey } from '../services/api-key.service.js';
import { enrichEvent } from '../services/event.service.js';
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

    const forwardedFor = req.headers['x-forwarded-for'];

    let ip = req.ip;

    if (typeof forwardedFor === 'string') {
      const firstIp = forwardedFor.split(',')[0];

      if (firstIp) {
        ip = firstIp.trim();
      }
    }

    if (ip === '127.0.0.1' || ip === '::1') {
      ip = '8.8.8.8';
    }

    const geo = await getGeo(ip);

    const userAgent = req.headers['user-agent'] ?? 'unknown';

    const device = parseUserAgent(userAgent);

    const enrichedEvents = body.events.map((event) =>
      enrichEvent(event, {
        websiteId: key.websiteId,

        ip,

        userAgent,

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

    await eventsQueue.add('track-event', enrichedEvents, {
      removeOnComplete: 1000,
      removeOnFail: 5000,
    });

    return reply.status(202).send({
      success: true,
      websiteId: key.websiteId,
      received: enrichedEvents.length,
    });
  });
}

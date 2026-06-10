import { FastifyInstance } from 'fastify';

import { eventsQueue } from '@traqory/queue';

import { BatchSchema } from '../schemas/event.schema.js';
import { validateApiKey } from '../services/api-key.service.js';
import { enrichEvent } from '../services/event.service.js';
import { getGeo } from '../services/geo.service.js';
import { parseUserAgent } from '../services/device.service.js';

export async function eventsRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const requestStart = Date.now();

    const result = BatchSchema.safeParse(req.body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        code: 'VALIDATION_ERROR',
        errors: result.error.issues,
      });
    }

    const body = result.data;

    const apiKeyStart = Date.now();

    const key = await validateApiKey(body.apiKey);

    console.log('validateApiKey:', Date.now() - apiKeyStart, 'ms');

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

    app.log.info({
      requestIp: req.ip,
      forwardedFor,
      resolvedIp: ip,
    });

    const geoStart = Date.now();

    const geo = await getGeo(ip);

    console.log('getGeo:', Date.now() - geoStart, 'ms');

    const userAgent = req.headers['user-agent'] ?? 'unknown';

    const device = parseUserAgent(userAgent);

    console.log('parseUserAgent:', Date.now() - geoStart, 'ms');

    const enrichStart = Date.now();

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

    console.log('enrichEvent:', Date.now() - enrichStart, 'ms');

    const queueStart = Date.now();

    await eventsQueue.add('track-event', enrichedEvents);

    console.log('queue.add:', Date.now() - queueStart, 'ms');

    const counts = await eventsQueue.getJobCounts();

    console.log('QUEUE COUNTS', counts);

    console.log('TOTAL REQUEST:', Date.now() - requestStart, 'ms');

    app.log.info(enrichedEvents);

    return reply.status(202).send({
      success: true,
      websiteId: key.websiteId,
      received: body.events.length,
    });
  });
}

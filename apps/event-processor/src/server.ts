import 'dotenv/config';

import Fastify from 'fastify';

import { createEvent } from '@traqory/database';
import { createEventsWorker } from '@traqory/queue';

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL ?? 'http://localhost:3002';

const worker = createEventsWorker(async (job) => {
  console.log(`Processing job ${job.id} (${job.data.length} events)`);

  for (const event of job.data) {
    await createEvent({
      websiteId: event.websiteId,

      event: event.event,

      properties: event.properties,

      path: event.path,

      url: event.url,

      ip: event.ip,

      userAgent: event.userAgent,

      visitorId: event.visitorId,

      sessionId: event.sessionId,

      userId: event.userId,

      browser: event.browser,

      browserVersion: event.browserVersion,

      os: event.os,

      osVersion: event.osVersion,

      deviceType: event.deviceType,

      country: event.country,

      region: event.region,

      city: event.city,

      latitude: event.latitude,

      longitude: event.longitude,

      timestamp: new Date(event.timestamp),

      receivedAt: new Date(event.receivedAt),
    });

    try {
      await fetch(`${ANALYTICS_API_URL}/v1/realtime/event`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          websiteId: event.websiteId,

          visitorId: event.visitorId,

          sessionId: event.sessionId,

          event: event.event,

          path: event.path,

          country: event.country,

          time: event.timestamp,
        }),
      });
    } catch (error) {
      console.error('Realtime broadcast failed', error);
    }
  }
});

worker.on('ready', () => {
  console.log('Worker ready');
});

worker.on('completed', (job) => {
  console.log(`Completed job ${job.id}`);
});

worker.on('failed', (job, error) => {
  console.error(`Failed job ${job?.id}`, error);
});

worker.on('error', (error) => {
  console.error('Worker error', error);
});

console.log('Event processor started');

const app = Fastify();

app.get('/health', async () => ({
  status: 'ok',
}));

await app.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT) || 3004,
});

console.log('Health server started');

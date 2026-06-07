import 'dotenv/config';

import { createEvent } from '@traqory/database';
import { createEventsWorker } from '@traqory/queue';

const worker = createEventsWorker(async (job) => {
  console.log('JOB RECEIVED');

  for (const event of job.data) {
    console.log('INSERTING EVENT');

    await createEvent({
      websiteId: event.websiteId,
      event: event.event,
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

    console.log('EVENT STORED');
  }
});

worker.on('failed', (job, err) => {
  console.error('JOB FAILED');
  console.error(err);
});

console.log('Event processor started');

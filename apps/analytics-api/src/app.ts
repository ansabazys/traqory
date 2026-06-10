import Fastify from 'fastify';
import cors from '@fastify/cors';

import './lib/realtime/events-per-second.js';
import './lib/realtime/cleanup.js';

import { env } from './config/env.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { analyticsModule } from './modules/analytics/analytics.module.js';
import { websiteModule } from './modules/websites/website.module.js';
import { healthRoute } from './routes/health.route.js';
import { realtimeRoutes } from './routes/realtime.route.js';

export const app = Fastify({
  logger: {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

app.decorateRequest('user', null);

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

await app.register(errorMiddleware);
await app.register(healthRoute);
await app.register(websiteModule, {
  prefix: '/v1/websites',
});
await app.register(analyticsModule, {
  prefix: '/v1/analytics',
});

await app.register(realtimeRoutes, {
  prefix: '/v1/realtime',
});

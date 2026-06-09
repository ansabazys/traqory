import Fastify from 'fastify';
import cors from '@fastify/cors';
import { eventsRoutes } from './routes/events';
import { healthRoutes } from './routes/health';
import { errorHandlerPlugin } from './plugins/error-handler.js';
import { rateLimitPlugin } from './plugins/rate-limit';

export async function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true,
  });

  await app.register(errorHandlerPlugin);
  await app.register(rateLimitPlugin);

  await app.register(cors, {
    origin: true,
    credentials: false,
  });

  await app.register(healthRoutes, {
    prefix: '/health',
  });

  await app.register(eventsRoutes, {
    prefix: '/v1/events',
  });

  return app;
}
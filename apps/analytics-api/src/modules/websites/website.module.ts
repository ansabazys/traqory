import type { FastifyInstance } from 'fastify';

import { websiteRoutes } from './routes/website.route.js';
import { overviewRoutes } from './routes/overview.routes.js';

export async function websiteModule(app: FastifyInstance) {
  await app.register(websiteRoutes);
  await app.register(overviewRoutes);
}

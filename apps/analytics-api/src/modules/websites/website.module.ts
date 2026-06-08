import type { FastifyInstance } from 'fastify';

import { websiteRoutes } from './routes/website.route.js';

export async function websiteModule(app: FastifyInstance) {
  await app.register(websiteRoutes);
}

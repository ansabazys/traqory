import type { FastifyInstance } from 'fastify';

import { requireAuth } from '../../../middleware/auth.middleware.js';
import { websiteController } from '../controllers/website.controller.js';

export async function websiteRoutes(app: FastifyInstance) {
  app.addHook('preHandler', requireAuth);

  app.post('/', websiteController.createWebsite);
  app.get('/', websiteController.listWebsites);
  app.get('/:id', websiteController.getWebsite);
  app.patch('/:id', websiteController.updateWebsite);
  app.delete('/:id', websiteController.deleteWebsite);

  app.post('/:id/api-keys', websiteController.createApiKey);
  app.get('/:id/api-keys', websiteController.listApiKeys);

  app.delete('/api-keys/:id', websiteController.revokeApiKey);
  app.post('/api-keys/:id/rotate', websiteController.rotateApiKey);

  app.get('/me', async (request) => {
    return request.user;
  });
}

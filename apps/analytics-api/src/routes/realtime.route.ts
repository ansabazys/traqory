import type { FastifyInstance } from 'fastify';

import { addClient, removeClient, broadcast } from '../lib/realtime/manager.js';
import { processEvent } from '../lib/realtime/process-event.js';
import { buildSnapshot } from '../lib/realtime/build-snapshot.js';

export interface RealtimeEvent {
  websiteId: string;
  visitorId: string;
  sessionId: string;
  event: string;
  path: string;
  country: string;
  time: string;
}

export async function realtimeRoutes(app: FastifyInstance) {
  app.get('/:websiteId/stream', async (request, reply) => {
    const { websiteId } = request.params as {
      websiteId: string;
    };

    console.log('Client connected:', websiteId);

    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });

    addClient(websiteId, reply.raw);

    reply.raw.write(
      `data: ${JSON.stringify({
        type: 'connected',
      })}\n\n`,
    );

    request.raw.on('close', () => {
      console.log('Client disconnected:', websiteId);

      removeClient(websiteId, reply.raw);
    });

    // IMPORTANT
    reply.hijack();
  });

  app.post('/:websiteId/test', async (request) => {
    const { websiteId } = request.params as {
      websiteId: string;
    };

    const event: RealtimeEvent = {
      websiteId,

      visitorId: `usr_${Date.now()}`,

      sessionId: `sess_${Date.now()}`,

      event: 'page_view',

      path: '/pricing',

      country: 'US',

      time: new Date().toISOString(),
    };

    const store = processEvent(event);

    const snapshot = buildSnapshot(store);

    broadcast(websiteId, snapshot);

    return {
      success: true,
    };
  });

  app.post<{
    Body: RealtimeEvent;
  }>('/event', async (request) => {
    const event = request.body;

    const store = processEvent(event);

    const snapshot = buildSnapshot(store);

    broadcast(event.websiteId, snapshot);

    return {
      success: true,
    };
  });
}

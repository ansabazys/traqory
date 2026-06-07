import { z } from 'zod';

export const EventSchema = z.object({
  event: z.string(),

  properties: z.record(z.string(), z.unknown()).optional(),

  path: z.string(),

  url: z.string(),

  visitorId: z.string(),

  sessionId: z.string(),

  userId: z.string().optional(),

  timestamp: z.number(),
});

export const BatchSchema = z.object({
  apiKey: z.string(),

  events: z.array(EventSchema),
});

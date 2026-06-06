import { z } from "zod";

export const EventSchema = z.object({
  event: z.string(),
  path: z.string(),
  url: z.string(),
  timestamp: z.number(),
});

export const BatchSchema = z.object({
  apiKey: z.string(),
  events: z.array(EventSchema),
});
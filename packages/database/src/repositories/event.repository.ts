import { db } from '../client.js';
import { event } from '../schema/analytics/event.schema.js';

export async function createEvent(data: typeof event.$inferInsert) {
  await db.insert(event).values(data);
}

export async function createEvents(data: (typeof event.$inferInsert)[]) {
  if (data.length === 0) {
    return;
  }

  await db.insert(event).values(data);
}

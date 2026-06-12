import { redis } from './cache.service.js';

const ACTIVE_VISITOR_TTL = 1800;

export async function touchVisitor(
  websiteId: string,
  sessionId: string,
) {
  await redis.set(
    `active:${websiteId}:${sessionId}`,
    '1',
    'EX',
    ACTIVE_VISITOR_TTL,
  );
}
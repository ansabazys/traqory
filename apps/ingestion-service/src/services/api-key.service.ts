import { findApiKeyByKey } from '@traqory/database';

import { redis } from './cache.service.js';

const API_KEY_CACHE_TTL = 300;

export async function validateApiKey(
  apiKey: string,
) {
  const cacheKey = `apikey:${apiKey}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const key = await findApiKeyByKey(apiKey);

  if (!key) {
    return null;
  }

  await redis.set(
    cacheKey,
    JSON.stringify(key),
    'EX',
    API_KEY_CACHE_TTL,
  );

  return key;
}
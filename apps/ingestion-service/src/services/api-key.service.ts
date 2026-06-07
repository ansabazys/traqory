import { findApiKeyByKey } from "@traqory/database";

export async function validateApiKey(
  key: string,
) {
  return findApiKeyByKey(key);
}
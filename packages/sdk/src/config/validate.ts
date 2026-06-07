import { SDKConfig } from "../types";


export function validateConfig(
  config: SDKConfig,
): void {
  if (!config.apiKey) {
    throw new Error(
      "[Traqory] apiKey is required",
    );
  }

  if (!config.endpoint) {
    throw new Error(
      "[Traqory] endpoint is required",
    );
  }

  if (
    config.batchSize !== undefined &&
    config.batchSize <= 0
  ) {
    throw new Error(
      "[Traqory] batchSize must be greater than 0",
    );
  }

  if (
    config.flushInterval !== undefined &&
    config.flushInterval <= 0
  ) {
    throw new Error(
      "[Traqory] flushInterval must be greater than 0",
    );
  }
}
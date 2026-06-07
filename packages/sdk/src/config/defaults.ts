import { SDKConfig } from "../types";

export const DEFAULT_CONFIG: Partial<SDKConfig> = {
  batchSize: 10,
  flushInterval: 5000,
  debug: false,
};
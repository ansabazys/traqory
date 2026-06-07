import { SDKConfig } from "./types";

export const DEFAULT_CONFIG: Required<
  Omit<SDKConfig, "apiKey">
> = {
  endpoint: "http://localhost:3000",

  autoPageview: true,
  debug: false,

  batchSize: 10,
  flushInterval: 5000,
};
import type { SDKConfig } from "./types";

export const DEFAULT_CONFIG: Required<
  Omit<SDKConfig, "apiKey">
> = {
  endpoint: "http://localhost:3003/v1/events",
  autoPageview: true,
  debug: false,
};
import type { SDKConfig } from "./types";

export const DEFAULT_CONFIG: Required<
  Omit<SDKConfig, "apiKey">
> = {
  endpoint: "http://localhost:3003/collect",
  autoPageview: true,
  debug: false,
};
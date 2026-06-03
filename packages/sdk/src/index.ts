import { client } from "./client";
import { setupAutoPageview } from "./features/auto-pageview";
import type { SDKConfig } from "./types";

export function init(config: SDKConfig): void {
  client.init(config);

  if (config.autoPageview !== false) {
    setupAutoPageview();
  }
}

export { getVisitorId } from "./core/visitor";
export { getSessionId } from "./core/session";

export { identify } from "./features/identify";
export { track } from "./features/track";
export { pageview } from "./features/pageview";
export { reset } from "./features/reset";
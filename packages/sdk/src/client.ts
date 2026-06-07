import type { SDKConfig } from "./types";
import { DEFAULT_CONFIG } from "./config";

import { getVisitorId } from "./core/visitor";
import { getSessionId } from "./core/session";
import { getUserId } from "./features/identify";
import { validateConfig } from "./config/validate";
import { setupLifecycleHandlers } from "./core/lifecycle";

class TraqoryClient {
  private config: SDKConfig | null = null;

  init(config: SDKConfig): void {
    if (!config.apiKey) {
      throw new Error("[Traqory] apiKey is required.");
    }

    validateConfig(config);

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
    
    setupLifecycleHandlers();
  }

  getConfig(): SDKConfig {
    if (!this.config) {
      throw new Error(
        "[Traqory] SDK not initialized. Call init() first."
      );
    }

    return this.config;
  }

  isInitialized(): boolean {
    return this.config !== null;
  }

  getVisitorId(): string {
    return getVisitorId();
  }

  getSessionId(): string {
    return getSessionId();
  }

  getUserId(): string | undefined {
    return getUserId();
  }
}

export const client = new TraqoryClient();
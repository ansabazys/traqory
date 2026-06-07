import type { SDKConfig } from "./types";
import { DEFAULT_CONFIG } from "./config";

import { getVisitorId } from "./core/visitor";
import { getSessionId } from "./core/session";
import { getUserId } from "./features/identify";

import { validateConfig } from "./config/validate";

import { setupLifecycleHandlers } from "./core/lifecycle";
import { setupNetworkHandlers } from "./core/network";

class TraqoryClient {
  private config: SDKConfig | null = null;

  init(config: SDKConfig): void {
    if (this.config) {
      console.warn(
        "[Traqory] SDK already initialized.",
      );

      return;
    }

    validateConfig(config);

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    setupLifecycleHandlers();
    setupNetworkHandlers();
  }

  getConfig(): SDKConfig {
    if (!this.config) {
      throw new Error(
        "[Traqory] SDK not initialized. Call init() first.",
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

export const client =
  new TraqoryClient();
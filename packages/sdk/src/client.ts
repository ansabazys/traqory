import type { SDKConfig } from './types';
import { DEFAULT_CONFIG } from './config';

class TraqoryClient {
  private config: SDKConfig | null = null;

  init(config: SDKConfig) {
    if (!config.apiKey) {
      throw new Error('[Traqory] apiKey is required.');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  getConfig(): SDKConfig {
    if (!this.config) {
      throw new Error('[Traqory] SDK not initialized. Call init() first.');
    }

    return this.config;
  }

  isInitialized() {
    return this.config !== null;
  }
}

export const client = new TraqoryClient();

import type { EventPayload } from "../types";
import { client } from "../client";
import { sendBatch } from "./transport";

class EventBatcher {
  private queue: EventPayload[] = [];

  private timer: number | null = null;

  private flushing = false;

  add(event: EventPayload): void {
    this.queue.push(event);

    const { batchSize = 10 } =
      client.getConfig();

    if (this.queue.length >= batchSize) {
      void this.flush();
      return;
    }

    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.timer) {
      return;
    }

    const { flushInterval = 5000 } =
      client.getConfig();

    this.timer = window.setTimeout(() => {
      void this.flush();
    }, flushInterval);
  }

  async flush(): Promise<void> {
    if (this.flushing) {
      return;
    }

    if (this.queue.length === 0) {
      return;
    }

    this.flushing = true;

    const batch = [...this.queue];

    this.queue = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      await sendBatch(batch);
    } catch (error) {
      this.queue.unshift(...batch);
      throw error;
    } finally {
      this.flushing = false;
    }
  }

  getQueue(): EventPayload[] {
    return [...this.queue];
  }

  clear(): void {
    this.queue = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const batcher =
  new EventBatcher();
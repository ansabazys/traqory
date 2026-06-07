import type { EventPayload } from "../types";
import { sendBatch } from "./transport";

const MAX_BATCH_SIZE = 10;
const FLUSH_INTERVAL = 5000;

class EventBatcher {
  private queue: EventPayload[] = [];

  private timer: number | null = null;

  add(event: EventPayload) {
    this.queue.push(event);

    if (this.queue.length >= MAX_BATCH_SIZE) {
      void this.flush();
      return;
    }

    this.scheduleFlush();
  }

  private scheduleFlush() {
    if (this.timer) {
      return;
    }

    this.timer = window.setTimeout(() => {
      void this.flush();
    }, FLUSH_INTERVAL);
  }

  async flush() {
    if (this.queue.length === 0) {
      return;
    }

    const batch = [...this.queue];

    this.queue = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    await sendBatch(batch);
  }
}

export const batcher =
  new EventBatcher();
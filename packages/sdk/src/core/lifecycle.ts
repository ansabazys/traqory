import { batcher } from "./batcher";
import { sendBeaconBatch } from "./transport";

function flushPendingEvents(): void {
  const events = batcher.getQueue();

  if (events.length === 0) {
    return;
  }

  const sent = sendBeaconBatch(events);

  if (sent) {
    batcher.clear();
  }
}

export function setupLifecycleHandlers(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener(
    "pagehide",
    flushPendingEvents,
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.visibilityState ===
        "hidden"
      ) {
        flushPendingEvents();
      }
    },
  );
}
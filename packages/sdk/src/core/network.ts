import { batcher } from "./batcher";

let initialized = false;

export function setupNetworkHandlers(): void {
  if (initialized) {
    return;
  }

  initialized = true;

  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener(
    "online",
    () => {
      void batcher.flush();
    },
  );
}
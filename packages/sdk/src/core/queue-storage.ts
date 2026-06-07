import type { EventPayload } from "../types";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "./storage";
import { debug } from "../utils/logger";

const STORAGE_KEY = "__traqory_queue";

export function saveQueue(
  events: EventPayload[],
): void {
  try {
    setLocalStorage(
      STORAGE_KEY,
      JSON.stringify(events),
    );
  } catch (error) {
    debug(
      "Failed to persist queue",
      error,
    );
  }
}

export function loadQueue(): EventPayload[] {
  try {
    const raw =
      getLocalStorage(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    debug(
      "Failed to load persisted queue",
      error,
    );

    return [];
  }
}

export function clearQueue(): void {
  try {
    removeLocalStorage(STORAGE_KEY);
  } catch (error) {
    debug(
      "Failed to clear persisted queue",
      error,
    );
  }
}
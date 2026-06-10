import { realtimeStores } from './store.js';
import { broadcast } from './manager.js';
import { buildSnapshot } from './build-snapshot.js';

const TTL = 30 * 60 * 1000;

setInterval(() => {
  const now = Date.now();

  for (const [
    websiteId,
    store,
  ] of realtimeStores.entries()) {
    let changed = false;

    for (const [
      userId,
      lastSeen,
    ] of store.userLastSeen) {
      if (
        now - lastSeen >
        TTL
      ) {
        store.userLastSeen.delete(
          userId,
        );

        store.activeUsers.delete(
          userId,
        );

        changed = true;
      }
    }

    for (const [
      sessionId,
      lastSeen,
    ] of store.sessionLastSeen) {
      if (
        now - lastSeen >
        TTL
      ) {
        store.sessionLastSeen.delete(
          sessionId,
        );

        store.activeSessions.delete(
          sessionId,
        );

        changed = true;
      }
    }

    if (changed) {
      const snapshot =
        buildSnapshot(store);

      broadcast(
        websiteId,
        snapshot,
      );
    }
  }
}, 60_000);
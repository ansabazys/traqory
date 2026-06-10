import { realtimeStores } from './store.js';

setInterval(() => {
  const now = Date.now();

  for (const store of realtimeStores.values()) {
    store.eventTimestamps =
      store.eventTimestamps.filter(
        (timestamp) =>
          now - timestamp < 1000,
      );

    store.eventsPerSecond =
      store.eventTimestamps.length;
  }
}, 250);
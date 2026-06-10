import { RealtimeEvent } from '../../routes/realtime.route.js';
import { realtimeStores } from './store.js';

export function processEvent(event: RealtimeEvent) {
  let store = realtimeStores.get(event.websiteId);

  if (!store) {
    store = {
      activeUsers: new Set(),

      activeSessions: new Set(),

      userLastSeen: new Map(),

      sessionLastSeen: new Map(),

      eventTypes: {},

      activePages: {},

      countries: {},

      liveEvents: [],

      eventsPerSecond: 0,

      eventTimestamps: [],
    };

    realtimeStores.set(event.websiteId, store);
  }

  const now = Date.now();

  // Events/sec tracking
  store.eventTimestamps.push(now);

  store.eventTimestamps = store.eventTimestamps.filter(
    (timestamp: number) => now - timestamp < 1000,
  );

  store.eventsPerSecond = store.eventTimestamps.length;

  // Active users
  store.activeUsers.add(event.visitorId);

  store.userLastSeen.set(event.visitorId, now);

  // Active sessions
  store.activeSessions.add(event.sessionId);

  store.sessionLastSeen.set(event.sessionId, now);

  // Event types
  store.eventTypes[event.event] = (store.eventTypes[event.event] ?? 0) + 1;

  // Pages
  store.activePages[event.path] = (store.activePages[event.path] ?? 0) + 1;

  // Countries
  store.countries[event.country] = (store.countries[event.country] ?? 0) + 1;

  // Live feed
  store.liveEvents.unshift(event);

  store.liveEvents = store.liveEvents.slice(0, 100);

  return store;
}

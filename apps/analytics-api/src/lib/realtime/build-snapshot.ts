import type { RealtimeStore } from './store.js';

export function buildSnapshot(store: RealtimeStore) {
  return {
    users: store.activeUsers.size,

    sessions: store.activeSessions.size,

    eventsPerSecond: store.eventsPerSecond,

    liveEvents: store.liveEvents,

    eventTypes: store.eventTypes,

    activePages: store.activePages,

    countries: store.countries,
  };
}

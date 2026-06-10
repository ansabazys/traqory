export interface RealtimeStore {
  activeUsers: Set<string>;

  activeSessions: Set<string>;

  userLastSeen: Map<string, number>;

  sessionLastSeen: Map<string, number>;

  eventTypes: Record<string, number>;

  activePages: Record<string, number>;

  countries: Record<string, number>;

  liveEvents: unknown[];

  eventsPerSecond: number;

  eventTimestamps: number[];
}

export const realtimeStores = new Map<string, RealtimeStore>();

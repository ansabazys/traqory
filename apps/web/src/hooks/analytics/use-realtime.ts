'use client';

import { useEffect, useState } from 'react';

export interface RealtimeSnapshot {
  users: number;

  sessions: number;

  eventsPerSecond: number;

  liveEvents: RealtimeEvent[];

  eventTypes: Record<string, number>;

  activePages: Record<string, number>;

  countries: Record<string, number>;
}

export interface RealtimeEvent {
  websiteId: string;

  visitorId: string;

  sessionId: string;

  event: string;

  path: string;

  country: string;

  time: string;
}

export function useRealtime(websiteId?: string) {
  const [snapshot, setSnapshot] = useState<RealtimeSnapshot | null>(null);

  useEffect(() => {
    if (!websiteId) {
      return;
    }

    const source = new EventSource(`/api/analytics/v1/realtime/${websiteId}/stream`);

    source.onopen = () => {
      console.log('SSE Connected');
    };

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === 'connected') {
        return;
      }

      setSnapshot(payload);
    };

    source.onerror = (error) => {
      console.error('SSE Error', error);
    };

    return () => {
      source.close();
    };
  }, [websiteId]);

  return snapshot;
}
    
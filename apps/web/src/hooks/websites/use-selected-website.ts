'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'selectedWebsiteId';

export function useSelectedWebsite() {
  const [selectedWebsiteId, setSelectedWebsiteId] =
    useState<string>('all');

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setSelectedWebsiteId(stored);
    }
  }, []);

  const selectWebsite = (id: string) => {
    setSelectedWebsiteId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return {
    selectedWebsiteId,
    selectWebsite,
  };
}
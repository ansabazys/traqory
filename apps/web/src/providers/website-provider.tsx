'use client';

import { useEffect, useState } from 'react';

import { WebsiteContext } from '@/contexts/website-context';
import { useWebsites } from '@/hooks/websites/use-websites';

const STORAGE_KEY = 'traqory:selected-website';

export function WebsiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: websites = [],
    isLoading,
  } = useWebsites();

  const [selectedWebsiteId, setSelectedWebsiteId] = useState<
    string | 'all'
  >('all');

  useEffect(() => {
    if (!websites.length) {
      return;
    }

    const storedId =
      localStorage.getItem(STORAGE_KEY);

    if (
      storedId &&
      (storedId === 'all' ||
        websites.some(
          (website) =>
            website.id === storedId,
        ))
    ) {
      setSelectedWebsiteId(storedId);
      return;
    }

    setSelectedWebsiteId('all');
  }, [websites]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      selectedWebsiteId,
    );
  }, [selectedWebsiteId]);

  const selectedWebsite =
    selectedWebsiteId === 'all'
      ? null
      : websites.find(
          (website) =>
            website.id ===
            selectedWebsiteId,
        ) ?? null;

  return (
    <WebsiteContext.Provider
      value={{
        websites,
        isLoading,
        selectedWebsiteId,
        selectedWebsite,
        setSelectedWebsiteId,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}
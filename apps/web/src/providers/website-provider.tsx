'use client';

import { useEffect, useMemo, useState } from 'react';

import { WebsiteContext } from '@/contexts/website-context';
import { useWebsites } from '@/hooks/websites/use-websites';

const STORAGE_KEY =
  'traqory:selected-website';

export function WebsiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: websites = [],
    isLoading,
  } = useWebsites();

  const [
    selectedWebsiteId,
    setSelectedWebsiteId,
  ] = useState('');

  useEffect(() => {
    if (!websites.length) {
      setSelectedWebsiteId('');
      return;
    }

    const storedId =
      localStorage.getItem(
        STORAGE_KEY,
      );

    const storedWebsite =
      websites.find(
        (website) =>
          website.id === storedId,
      );

    if (storedWebsite) {
      setSelectedWebsiteId(
        storedWebsite.id,
      );
      return;
    }

    const latestWebsite = [
      ...websites,
    ].sort(
      (a, b) =>
        new Date(
          b.createdAt,
        ).getTime() -
        new Date(
          a.createdAt,
        ).getTime(),
    )[0];

    setSelectedWebsiteId(
      latestWebsite?.id ?? '',
    );
  }, [websites]);

  useEffect(() => {
    if (!selectedWebsiteId) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      selectedWebsiteId,
    );
  }, [selectedWebsiteId]);

  const selectedWebsite =
    useMemo(
      () =>
        websites.find(
          (website) =>
            website.id ===
            selectedWebsiteId,
        ) ?? null,
      [
        websites,
        selectedWebsiteId,
      ],
    );

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
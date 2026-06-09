'use client';

import {
  createContext,
  useContext,
} from 'react';

import { Website } from '@/components/websites/types';

export interface WebsiteContextValue {
  websites: Website[];

  isLoading: boolean;

  selectedWebsiteId: string;

  selectedWebsite: Website | null;

  setSelectedWebsiteId: (
    websiteId: string,
  ) => void;
}

export const WebsiteContext =
  createContext<
    WebsiteContextValue | undefined
  >(undefined);

export function useWebsiteContext() {
  const context =
    useContext(WebsiteContext);

  if (!context) {
    throw new Error(
      'useWebsiteContext must be used inside WebsiteProvider',
    );
  }

  return context;
}
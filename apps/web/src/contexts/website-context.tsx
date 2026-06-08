"use client";

import { Website } from "@/types/website";
import {
  createContext,
  useContext,
} from "react";



interface WebsiteContextValue {
  website: Website | null;

  setWebsite: (
    website: Website | null,
  ) => void;
}

export const WebsiteContext =
  createContext<
    WebsiteContextValue | undefined
  >(undefined);

export function useWebsiteContext() {
  const context = useContext(
    WebsiteContext,
  );

  if (!context) {
    throw new Error(
      "useWebsiteContext must be used inside WebsiteProvider",
    );
  }

  return context;
}
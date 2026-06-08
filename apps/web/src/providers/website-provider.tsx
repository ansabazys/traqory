"use client";

import {
  useEffect,
  useState,
} from "react";

import { WebsiteContext } from "@/contexts/website-context";
import { useWebsites } from "@/hooks/websites/use-websites";
import { Website } from "@/components/websites/types";

const STORAGE_KEY =
  "traqory:selected-website";

export function WebsiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useWebsites();

  const [website, setWebsite] =
    useState<Website | null>(null);

  // Restore selected website
  useEffect(() => {
    if (!data?.length) return;

    const storedId =
      localStorage.getItem(
        STORAGE_KEY,
      );

    if (storedId) {
      const selected =
        data.find(
          (site) =>
            site.id === storedId,
        ) ?? null;

      if (selected) {
        setWebsite(selected);
        return;
      }
    }

    setWebsite(data[0]);
  }, [data]);

  // Persist selection
  useEffect(() => {
    if (!website) return;

    localStorage.setItem(
      STORAGE_KEY,
      website.id,
    );
  }, [website]);

  return (
    <WebsiteContext.Provider
      value={{
        website,
        setWebsite,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}
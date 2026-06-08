"use client";

import {
  useEffect,
  useState,
} from "react";

import { WebsiteContext } from "@/contexts/website-context";
import { useWebsites } from "@/hooks/use-websites";

import type { Website } from "@/contexts/website-context";

export function WebsiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useWebsites();

  const [website, setWebsite] =
    useState<Website | null>(null);

  useEffect(() => {
    if (
      !website &&
      data?.length
    ) {
      setWebsite(data[0]);
    }
  }, [data, website]);

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
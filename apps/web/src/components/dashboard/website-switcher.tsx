"use client";

import { useWebsites } from "@/hooks/use-websites";
import { useSelectedWebsite } from "@/hooks/use-selected-website";

export function WebsiteSwitcher() {
  const { data } =
    useWebsites();

  const {
    website,
    setWebsite,
  } = useSelectedWebsite();

  return (
    <select
      value={website?.id ?? ""}
      onChange={(e) => {
        const selected =
          data?.find(
            (site) =>
              site.id ===
              e.target.value,
          ) ?? null;

        setWebsite(selected);
      }}
    >
      {data?.map((site) => (
        <option
          key={site.id}
          value={site.id}
        >
          {site.name}
        </option>
      ))}
    </select>
  );
}
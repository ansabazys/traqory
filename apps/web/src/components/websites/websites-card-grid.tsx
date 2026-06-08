"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
} from "motion/react";
import { WebsitesCard } from "@/components/websites/websites-card";
import { type Website } from "@/components/websites/types";

export function WebsitesCardGrid({
  websites,
  copiedKey,
  openMenuId,
  menuRef,
  onToggleMenu,
  onViewAnalytics,
  onViewEvents,
  onCopyScript,
  onRegenerateApiKey,
  onDeleteWebsite,
  onOpenSetup,
  variants,
}: {
  websites: Website[];
  copiedKey: string | null;
  openMenuId: string | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onToggleMenu: (websiteId: string) => void;
  onViewAnalytics: (website: Website) => void;
  onViewEvents: (website: Website) => void;
  onCopyScript: (website: Website) => void;
  onRegenerateApiKey: (websiteId: string) => void;
  onDeleteWebsite: (websiteId: string) => void;
  onOpenSetup: (websiteId: string) => void;
  variants: Variants;
}) {
  return (
    <motion.div layout variants={variants} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <AnimatePresence>
        {websites.map((website) => (
          <WebsitesCard
            key={website.id}
            website={website}
            copiedKey={copiedKey}
            isMenuOpen={openMenuId === website.id}
            menuRef={menuRef}
            onToggleMenu={() => onToggleMenu(website.id)}
            onViewAnalytics={() => onViewAnalytics(website)}
            onViewEvents={() => onViewEvents(website)}
            onCopyScript={() => onCopyScript(website)}
            onRegenerateApiKey={() => onRegenerateApiKey(website.id)}
            onDeleteWebsite={() => onDeleteWebsite(website.id)}
            onOpenSetup={() => onOpenSetup(website.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

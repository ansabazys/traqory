'use client';

import {
  Activity,
  BarChart2,
  Copy,
  ExternalLink,
  MoreHorizontal,
  RefreshCcw,
  Trash2,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { WebsitesSparkline } from '@/components/websites/websites-sparkline';
import { WebsitesStatusBadge } from '@/components/websites/websites-status-badge';
import { type Website } from '@/components/websites/types';

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}

function formatRelativeTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.max(0, Math.floor(diff / (1000 * 60)));

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

export function WebsitesCard({
  website,
  copiedKey,
  isMenuOpen,
  menuRef,
  onToggleMenu,
  onViewAnalytics,
  onViewEvents,
  onCopyScript,
  onRegenerateApiKey,
  onDeleteWebsite,
  onOpenSetup,
}: {
  website: Website;
  copiedKey: string | null;
  isMenuOpen: boolean;
  menuRef?: React.RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
  onViewAnalytics: () => void;
  onViewEvents: () => void;
  onCopyScript: () => void;
  onRegenerateApiKey: () => void;
  onDeleteWebsite: () => void;
  onOpenSetup: () => void;
}) {
  const actions = [
    {
      label: 'View Analytics',
      icon: <BarChart2 className="h-3.5 w-3.5" />,
      onClick: onViewAnalytics,
    },
    { label: 'View Events', icon: <Activity className="h-3.5 w-3.5" />, onClick: onViewEvents },
    {
      label: 'Copy Tracking Script',
      icon: <Copy className="h-3.5 w-3.5" />,
      onClick: onCopyScript,
    },
    {
      label: 'Regenerate API Key',
      icon: <RefreshCcw className="h-3.5 w-3.5" />,
      onClick: onRegenerateApiKey,
    },
    { label: 'Delete Website', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: onDeleteWebsite },
  ];

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ scale: 1.02, borderColor: '#2a2a2a' }}
      transition={{ duration: 0.22 }}
      onClick={onViewAnalytics}
      className="cursor-pointer border border-[#1a1a1a] bg-[#0a0a0a] p-5"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
        
          <img
            src={`https://www.google.com/s2/favicons?domain=${website.domain}&sz=64`}
            alt={`${website.domain} favicon`}
            className="h-10 w-10 border border-[#1a1a1a] bg-[#111111] p-2"
          />
          <div>
            <div className="mb-1 flex items-center gap-3">
              <h2 className="text-sm font-semibold text-white">{website.name}</h2>
              <WebsitesStatusBadge status={website.status} />
            </div>
            <p className="text-xs font-mono text-[#666666]">{website.domain}</p>
          </div>
        </div>

        <div
          ref={isMenuOpen ? menuRef : undefined}
          className="relative"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onToggleMenu}
            className="flex h-9 w-9 items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a] text-[#888888] transition-colors hover:border-[#2a2a2a] hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-11 z-10 min-w-[200px] border border-[#1a1a1a] bg-[#0a0a0a] p-1 shadow-2xl"
              >
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      action.onClick();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-mono text-[#d1d5db] transition-colors hover:bg-[#111111]"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Events / 24h
          </p>
          <p className="text-2xl font-semibold tracking-tight text-white">
            {formatCompactNumber(website.events24h)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Active Users
          </p>
          <p className="text-2xl font-semibold tracking-tight text-white">
            {formatCompactNumber(website.activeUsers)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Last Active
          </p>
          <p className="text-xs font-mono text-[#d1d5db]">
            {website.events24h === 0 || !website.lastActive
              ? 'never'
              : formatRelativeTime(website.lastActive)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Health
          </p>
          <p className="text-xs font-mono text-[#d1d5db]">
            {website.status === 'ACTIVE'
              ? 'receiving events'
              : website.status === 'INACTIVE'
                ? 'traffic stale'
                : website.status === 'ARCHIVED'
                  ? 'archived'
                  : 'setup pending'}
          </p>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Recent Trend
          </p>
          <WebsitesSparkline values={website.sparkline} />
        </div>

        {copiedKey === website.id ? (
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#d1d5db]">
            Copied
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenSetup();
          }}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d1d5db] transition-colors hover:text-white"
        >
          <Wrench className="h-3.5 w-3.5" />
          <span>View Setup</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666666]">
          <span>Open Analytics</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Globe,
} from 'lucide-react';

import { Website } from '@/components/websites/types';

type Props = {
  websites: Website[];
  selectedWebsiteId: string | 'all';
  onChange: (
    id: string | 'all',
  ) => void;
};

export function WebsiteSelector({
  websites,
  selectedWebsiteId,
  onChange,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        !containerRef.current?.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    window.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () =>
      window.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  const selectedWebsite =
    selectedWebsiteId === 'all'
      ? null
      : websites.find(
          (website) =>
            website.id ===
            selectedWebsiteId,
        );

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex h-9 min-w-[190px]
          items-center justify-between
          border border-[#1a1a1a]
          bg-[#111111]
          px-3
          text-xs
          font-mono
          uppercase
          tracking-widest
          text-white
          transition-colors
          hover:border-[#2a2a2a]
        "
      >
        <span className="truncate">
          {selectedWebsite?.name ??
            'All Websites'}
        </span>

        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open
              ? 'rotate-180'
              : ''
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-11 z-50
            min-w-[240px]
            border border-[#1a1a1a]
            bg-[#0a0a0a]
            p-1
            shadow-2xl
          "
        >
          <button
            type="button"
            onClick={() => {
              onChange('all');
              setOpen(false);
            }}
            className="
              flex w-full items-center justify-between
              px-3 py-2
              text-left
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-[#d1d5db]
              transition-colors
              hover:bg-[#111111]
            "
          >
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              <span>
                All Websites
              </span>
            </div>

            {selectedWebsiteId ===
              'all' && (
              <Check className="h-3.5 w-3.5 text-green-400" />
            )}
          </button>

          <div className="my-1 border-t border-[#1a1a1a]" />

          {websites.map(
            (website) => (
              <button
                key={website.id}
                type="button"
                onClick={() => {
                  onChange(
                    website.id,
                  );
                  setOpen(false);
                }}
                className="
                  flex w-full items-center justify-between
                  px-3 py-2
                  text-left
                  text-xs
                  font-mono
                  uppercase
                  tracking-widest
                  text-[#d1d5db]
                  transition-colors
                  hover:bg-[#111111]
                "
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${website.domain}&sz=64`}
                    alt=""
                    className="h-4 w-4 flex-shrink-0"
                  />

                  <span className="truncate">
                    {website.name}
                  </span>
                </div>

                {selectedWebsiteId ===
                  website.id && (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                )}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
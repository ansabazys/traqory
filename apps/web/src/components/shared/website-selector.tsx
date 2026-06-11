'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { Website } from '@/components/websites/types';

type Props = {
  websites: Website[];
  selectedWebsiteId: string;
  onChange: (id: string) => void;
};

export function WebsiteSelector({
  websites,
  selectedWebsiteId,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const [mobileExpanded, setMobileExpanded] =
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

        if (
          typeof window !== 'undefined' &&
          window.innerWidth < 640
        ) {
          setMobileExpanded(false);
        }
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
    websites.find(
      (website) =>
        website.id ===
        selectedWebsiteId,
    ) ?? null;

  if (!websites.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
    >
      <button
        type="button"
        onClick={() => {
          if (
            typeof window !== 'undefined' &&
            window.innerWidth < 640
          ) {
            if (!mobileExpanded) {
              setMobileExpanded(true);
              return;
            }
          }

          setOpen((prev) => !prev);
        }}
        className={`
          flex h-9 items-center
          border border-[#1a1a1a]
          bg-[#111111]
          text-white
          transition-all duration-300
          hover:border-[#2a2a2a]

          ${
            mobileExpanded
              ? 'w-[150px] px-3 justify-between'
              : 'w-9 px-0 justify-center'
          }

          sm:w-[220px]
          sm:px-3
          sm:justify-between
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedWebsite && (
            <img
              src={`https://www.google.com/s2/favicons?domain=${selectedWebsite.domain}&sz=64`}
              alt=""
              className="h-4 w-4 flex-shrink-0"
            />
          )}

          <span
            className={`
              truncate
              text-xs
              font-mono
              uppercase
              tracking-widest

              ${
                mobileExpanded
                  ? 'block'
                  : 'hidden'
              }

              sm:block
            `}
          >
            {selectedWebsite?.name}
          </span>
        </div>

        <ChevronDown
          className={`
            h-3.5 w-3.5
            flex-shrink-0
            transition-transform

            ${
              mobileExpanded
                ? 'block'
                : 'hidden'
            }

            sm:block

            ${
              open
                ? 'rotate-180'
                : ''
            }
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-11
            z-50
            w-[240px]
            border
            border-[#1a1a1a]
            bg-[#0a0a0a]
            p-1
            shadow-2xl
          "
        >
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

                  if (
                    typeof window !==
                      'undefined' &&
                    window.innerWidth <
                      640
                  ) {
                    setMobileExpanded(
                      false,
                    );
                  }
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-3
                  py-2
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
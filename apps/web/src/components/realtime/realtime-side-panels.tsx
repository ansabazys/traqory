'use client';

import { FileText, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';

type RealtimeRegion = {
  geo: string;
  count: string;
  width: string;
};

type EventType = {
  event: string;
  count: number;
};

type ActivePage = {
  path: string;
  count: number;
};

interface RealtimeSidePanelsProps {
  regions: RealtimeRegion[];

  eventTypes: EventType[];

  activePages: ActivePage[];
}

export function RealtimeSidePanels({
  regions,
  eventTypes,
  activePages,
}: RealtimeSidePanelsProps) {
  return (
    <motion.div
      className="flex w-full flex-col gap-4 lg:w-[320px]"
      variants={{
        hidden: { opacity: 0, x: 1 },
        show: { opacity: 1, x: 0 },
      }}
      transition={{
        duration: 0.45,
        delay: 0.12,
      }}
    >
      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{
          y: -3,
          borderColor: '#2a2a2a',
        }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Event Types</span>
          <Zap className="h-3.5 w-3.5" />
        </div>

        <div className="flex flex-col gap-3.5 text-xs font-mono">
          {eventTypes.length > 0 ? (
            eventTypes.map((item) => (
              <div
                key={item.event}
                className="flex items-center justify-between text-[#ededed]"
              >
                <span>{item.event}</span>

                <span className="font-semibold">
                  {item.count}
                </span>
              </div>
            ))
          ) : (
            <span className="text-[#666]">
              No events
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{
          y: -3,
          borderColor: '#2a2a2a',
        }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Active Pages</span>

          <FileText className="h-3.5 w-3.5" />
        </div>

        <div className="flex flex-col gap-3.5 text-xs font-mono">
          {activePages.length > 0 ? (
            activePages.map((page) => (
              <div
                key={page.path}
                className="flex items-center justify-between text-[#ededed]"
              >
                <span className="truncate pr-4">
                  {page.path}
                </span>

                <span className="font-semibold">
                  {page.count}
                </span>
              </div>
            ))
          ) : (
            <span className="text-[#666]">
              No pages
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{
          y: -3,
          borderColor: '#2a2a2a',
        }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Top Regions</span>

          <Globe className="h-3.5 w-3.5" />
        </div>

        <div className="mt-1 flex flex-col gap-4 text-xs font-mono">
          {regions.length > 0 ? (
            regions.map(
              (
                region,
                index,
              ) => (
                <div
                  key={region.geo}
                  className="flex items-center text-[#ededed]"
                >
                  <span className="w-20 font-semibold truncate">
                    {region.geo}
                  </span>

                  <div className="ml-4 mr-6 h-[2px] flex-1 bg-[#222]">
                    <motion.div
                      className="h-full bg-[#ededed]"
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          region.width,
                      }}
                      transition={{
                        delay:
                          0.35 +
                          index * 0.08,
                        duration: 0.5,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right font-semibold">
                    {region.count}
                  </span>
                </div>
              ),
            )
          ) : (
            <span className="text-[#666]">
              No regions
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
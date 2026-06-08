"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  EventsFilterBar,
  type DateRangeFilter,
  type EventStatusFilter,
} from "@/components/events/events-filter-bar";
import { EventsTable } from "@/components/events/events-table";
import { EventDetailDrawer, type EventLog } from "@/components/events/event-detail-drawer";
import { EventsSidebar } from "@/components/events/events-sidebar";

const EVENT_NAMES = [
  "page_view",
  "click",
  "signup",
  "checkout_started",
  "api_error",
  "form_submit",
] as const;
const PATHS = ["/", "/pricing", "/docs/api", "/dashboard", "/signup", "/checkout", "/api/billing"];
const DEVICES = ["MacBook Pro", "Windows PC", "iPhone 14", "Pixel 8", "iPad Pro"];
const BROWSERS = ["Chrome 122", "Safari 17", "Edge 121", "Firefox 123"];
const COUNTRIES = ["United States", "Germany", "United Kingdom", "India", "Canada", "France"];
const PLANS = ["starter", "pro", "enterprise"];
const REFS = ["ads", "direct", "google", "partner", "email"];

const topStatVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function createMockEvent(index: number, now: number): EventLog {
  const eventName = EVENT_NAMES[index % EVENT_NAMES.length];
  const timestamp = new Date(now - index * 1000 * 60 * 18 - (index % 7) * 1000 * 43);
  const status: EventLog["status"] =
    eventName === "api_error" || index % 14 === 0 ? "error" : "success";
  const userId = `usr_${(1000 + index * 17).toString().padStart(4, "0")}`;
  const sessionId = `sess_${(900000 + index * 13).toString(36)}`;
  const path = PATHS[index % PATHS.length];
  const baseProperties: EventLog["properties"] = {
    ref: REFS[index % REFS.length],
    device: DEVICES[index % DEVICES.length],
  };

  if (eventName === "signup") {
    baseProperties.plan = PLANS[index % PLANS.length];
    baseProperties.source = REFS[(index + 2) % REFS.length];
  }

  if (eventName === "click") {
    baseProperties.element = ["cta_primary", "nav_docs", "pricing_toggle", "checkout_submit"][
      index % 4
    ];
  }

  if (eventName === "page_view") {
    baseProperties.ref = REFS[(index + 1) % REFS.length];
    baseProperties.duration_ms = 1200 + index * 8;
  }

  if (eventName === "checkout_started") {
    baseProperties.plan = PLANS[(index + 1) % PLANS.length];
    baseProperties.value = 49 + (index % 3) * 50;
  }

  if (eventName === "api_error") {
    baseProperties.code = [401, 429, 500, 504][index % 4];
    baseProperties.service = ["billing", "auth", "events"][index % 3];
    baseProperties.retryable = index % 2 === 0;
  }

  if (eventName === "form_submit") {
    baseProperties.form = ["contact_sales", "newsletter", "support_request"][index % 3];
  }

  return {
    id: `evt_${(38291000 + index * 97).toString(36)}`,
    eventName,
    timestamp: timestamp.toISOString(),
    userId,
    sessionId,
    path,
    status,
    properties: baseProperties,
    device: DEVICES[index % DEVICES.length],
    browser: BROWSERS[index % BROWSERS.length],
    country: COUNTRIES[index % COUNTRIES.length],
  };
}

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return String(value);
}

function isWithinRange(timestamp: string, range: DateRangeFilter) {
  if (range === "all") return true;

  const eventTime = new Date(timestamp).getTime();
  const now = Date.now();
  const diff = now - eventTime;
  const day = 1000 * 60 * 60 * 24;

  if (range === "24h") return diff <= day;
  if (range === "7d") return diff <= day * 7;
  return diff <= day * 30;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventLog[]>(() =>
    Array.from({ length: 84 }, (_, index) => createMockEvent(index, Date.now())),
  );
  const [selectedEvent, setSelectedEvent] = useState<EventLog | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedEventName, setSelectedEventName] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<EventStatusFilter>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeFilter>("7d");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (!isLive) return;

    const interval = window.setInterval(() => {
      setEvents((current) =>
        [createMockEvent(current.length + 1, Date.now()), ...current].slice(0, 100),
      );
    }, 2400);

    return () => window.clearInterval(interval);
  }, [isLive]);

  const eventNameOptions = useMemo(
    () => ["all", ...Array.from(new Set(events.map((event) => event.eventName)))],
    [events],
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        debouncedSearch.length === 0 ||
        event.eventName.toLowerCase().includes(debouncedSearch) ||
        event.userId.toLowerCase().includes(debouncedSearch) ||
        event.path.toLowerCase().includes(debouncedSearch);

      const matchesEventName = selectedEventName === "all" || event.eventName === selectedEventName;
      const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;
      const matchesDateRange = isWithinRange(event.timestamp, selectedDateRange);

      return matchesSearch && matchesEventName && matchesStatus && matchesDateRange;
    });
  }, [debouncedSearch, events, selectedDateRange, selectedEventName, selectedStatus]);

  const eventTypeCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const event of events) {
      counts.set(event.eventName, (counts.get(event.eventName) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([eventName, count]) => ({ eventName, count }))
      .sort((a, b) => b.count - a.count);
  }, [events]);

  const topPaths = useMemo(() => {
    const counts = new Map<string, number>();

    for (const event of filteredEvents) {
      counts.set(event.path, (counts.get(event.path) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredEvents]);

  const recentErrors = useMemo(
    () =>
      filteredEvents
        .filter((event) => event.status === "error")
        .slice(0, 3)
        .map((event) => ({
          id: event.id,
          message: `${event.eventName} on ${event.path}`,
          timestamp: event.timestamp,
        })),
    [filteredEvents],
  );

  const totalEvents = filteredEvents.length;
  const errorCount = filteredEvents.filter((event) => event.status === "error").length;
  const signupCount = filteredEvents.filter((event) => event.eventName === "signup").length;

  const topStats = [
    {
      label: "Events",
      value: formatCompactNumber(totalEvents),
      delta: `${eventTypeCounts.length} types`,
      tone: "text-[#888888]",
    },
    {
      label: "Errors",
      value: formatCompactNumber(errorCount),
      delta: `${totalEvents === 0 ? 0 : Math.round((errorCount / totalEvents) * 100)}% rate`,
      tone: errorCount > 0 ? "text-[#ef4444]" : "text-[#888888]",
    },
    {
      label: "Signups",
      value: formatCompactNumber(signupCount),
      delta: `${isLive ? "Live stream on" : "Snapshot"}`,
      tone: "text-[#22c55e]",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="flex w-full h-full min-h-screen flex-col gap-4 bg-[#0a0a0a] pb-10 text-white uppercase"
    >
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {topStats.map((stat) => (
          <motion.div
            key={stat.label}
            className="relative flex h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
            variants={topStatVariants}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, borderColor: "#2a2a2a" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
              {stat.label}
            </span>
            <span className="pb-1 text-3xl font-semibold tracking-tight">{stat.value}</span>
            <div className={`absolute bottom-5 right-5 text-xs font-mono ${stat.tone}`}>
              {stat.delta}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={topStatVariants}
        transition={{ duration: 0.45 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="mb-1 text-[13px] font-semibold tracking-wide text-white">Event Logs</h1>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#888]">
            Filter, inspect, and debug product events in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-semibold tracking-widest text-[#888]">
            Live
          </span>
          <button
            onClick={() => setIsLive((current) => !current)}
            className={`relative flex h-6 w-11 items-center border px-1 transition-colors focus:outline-none ${isLive ? "border-[#22c55e]/50 bg-[#22c55e]/20" : "border-[#333] bg-[#1a1a1a]"}`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-4 w-4 rounded-full ${isLive ? "bg-[#22c55e]" : "bg-[#555]"}`}
              style={{ marginLeft: isLive ? "auto" : 0 }}
            />
          </button>
        </div>
      </motion.div>

      <motion.div variants={topStatVariants} transition={{ duration: 0.45 }}>
        <EventsFilterBar
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          selectedEventName={selectedEventName}
          selectedStatus={selectedStatus}
          selectedDateRange={selectedDateRange}
          onEventNameChange={setSelectedEventName}
          onStatusChange={setSelectedStatus}
          onDateRangeChange={setSelectedDateRange}
          eventNameOptions={eventNameOptions}
        />
      </motion.div>

      <motion.div
        className="flex min-h-[600px] flex-1 flex-col gap-4 pb-10 lg:flex-row"
        variants={topStatVariants}
        transition={{ duration: 0.45 }}
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <EventsTable
            events={filteredEvents}
            onRowClick={setSelectedEvent}
            isLive={isLive}
            selectedEventId={selectedEvent?.id ?? null}
          />
        </div>

        <EventsSidebar
          eventTypes={eventTypeCounts}
          activeEventName={selectedEventName}
          onSelectEventName={setSelectedEventName}
          topPaths={topPaths}
          recentErrors={recentErrors}
        />
      </motion.div>

      <EventDetailDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </motion.div>
  );
}

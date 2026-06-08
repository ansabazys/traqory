"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Copy, X, Code, Monitor, MapPin, Clock, Server, User } from "lucide-react";

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export interface EventLog {
  id: string;
  eventName: string;
  timestamp: string;
  userId: string;
  sessionId: string;
  path: string;
  status: "success" | "error";
  properties: JsonObject;
  device: string;
  browser: string;
  country: string;
}

interface EventDetailDrawerProps {
  event: EventLog | null;
  onClose: () => void;
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function JsonTreeNode({
  label,
  value,
  depth = 0,
}: {
  label?: string;
  value: JsonValue;
  depth?: number;
}) {
  const isArray = Array.isArray(value);
  const isObject = typeof value === "object" && value !== null && !isArray;
  const [isOpen, setIsOpen] = useState(depth < 1);

  if (!isArray && !isObject) {
    return (
      <div className="flex items-start gap-2 py-1 text-[11px]">
        {label ? <span className="text-[#888]">{label}:</span> : null}
        <span className="break-all text-[#ededed]">{String(value)}</span>
      </div>
    );
  }

  const entries = isArray
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value);

  return (
    <div className="py-1 text-[11px]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-2 text-[#888] transition-colors hover:text-white"
      >
        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        {label ? <span>{label}</span> : null}
        <span className="text-[#555]">
          {isArray ? `[${entries.length}]` : `{${entries.length}}`}
        </span>
      </button>

      {isOpen ? (
        <div className="ml-5 mt-1 border-l border-[#1a1a1a] pl-3">
          {entries.map(([entryLabel, entryValue]) => (
            <JsonTreeNode
              key={entryLabel}
              label={entryLabel}
              value={entryValue}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MetaBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <div className="flex items-center gap-1.5 text-[#666]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="break-all font-mono text-white">{value}</div>
    </div>
  );
}

export function EventDetailDrawer({ event, onClose }: EventDetailDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose]);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  if (!event) return null;

  const fullPayload = {
    id: event.id,
    eventName: event.eventName,
    timestamp: event.timestamp,
    userId: event.userId,
    sessionId: event.sessionId,
    path: event.path,
    status: event.status,
    context: {
      device: event.device,
      browser: event.browser,
      country: event.country,
    },
    properties: event.properties,
  };

  return (
    <AnimatePresence>
      {event ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-[#1a1a1a] bg-[#0a0a0a] shadow-2xl sm:w-[560px]"
          >
            <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                  <span
                    className={`h-2 w-2 rounded-full ${event.status === "success" ? "bg-[#22c55e]" : "bg-[#ef4444]"}`}
                  ></span>
                  {event.eventName}
                </h2>
                <p className="mt-1 text-xs font-mono text-[#888]">{event.id}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(fullPayload, null, 2));
                    setCopied(true);
                  }}
                  className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                  title="Copy JSON"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-8 grid grid-cols-2 gap-4">
                <MetaBlock
                  icon={<Clock className="h-3.5 w-3.5" />}
                  label="Timestamp"
                  value={formatTimestamp(event.timestamp)}
                />
                <MetaBlock
                  icon={<User className="h-3.5 w-3.5" />}
                  label="User ID"
                  value={event.userId}
                />
                <MetaBlock
                  icon={<Server className="h-3.5 w-3.5" />}
                  label="Session ID"
                  value={event.sessionId}
                />
                <MetaBlock
                  icon={<Code className="h-3.5 w-3.5" />}
                  label="Path"
                  value={event.path}
                />
                <MetaBlock
                  icon={<Monitor className="h-3.5 w-3.5" />}
                  label="Device / Browser"
                  value={`${event.device} | ${event.browser}`}
                />
                <MetaBlock
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  label="Country"
                  value={event.country}
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#666]">
                    <Code className="h-3.5 w-3.5" />
                    <span>JSON Payload</span>
                  </div>
                  {copied ? (
                    <span className="text-[10px] font-mono text-[#22c55e]">Copied</span>
                  ) : null}
                </div>

                <div className="border border-[#1a1a1a] bg-[#111] p-4 font-mono">
                  <JsonTreeNode value={fullPayload} />
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

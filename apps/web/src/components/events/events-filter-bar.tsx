"use client";

import { Search, ChevronDown, Plus } from "lucide-react";

export type EventStatusFilter = "all" | "success" | "error";
export type DateRangeFilter = "24h" | "7d" | "30d" | "all";

interface EventsFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedEventName: string;
  selectedStatus: EventStatusFilter;
  selectedDateRange: DateRangeFilter;
  onEventNameChange: (value: string) => void;
  onStatusChange: (value: EventStatusFilter) => void;
  onDateRangeChange: (value: DateRangeFilter) => void;
  eventNameOptions: string[];
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 appearance-none border border-[#1a1a1a] bg-[#0a0a0a] px-3 pr-8 text-xs font-mono text-[#888] transition-colors hover:bg-[#111] hover:text-white focus:outline-none focus:border-[#333]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
    </div>
  );
}

export function EventsFilterBar({
  searchValue,
  onSearchChange,
  selectedEventName,
  selectedStatus,
  selectedDateRange,
  onEventNameChange,
  onStatusChange,
  onDateRangeChange,
  eventNameOptions,
}: EventsFilterBarProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3 border-b border-[#1a1a1a] pb-4 sm:flex-row sm:items-center">
      <div className="group relative max-w-md flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[#555] transition-colors group-focus-within:text-[#888]" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search event name, user ID, or path..."
          className="h-9 w-full border border-[#1a1a1a] bg-[#0a0a0a] pl-9 pr-4 text-xs font-mono text-white placeholder-[#555] transition-all focus:outline-none focus:border-[#333] focus:ring-1 focus:ring-[#333]"
        />
      </div>

      <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
        <FilterSelect
          value={selectedEventName}
          onChange={onEventNameChange}
          options={eventNameOptions.map((eventName) => ({
            label: eventName === "all" ? "Event Name: All" : eventName,
            value: eventName,
          }))}
        />
        <FilterSelect
          value={selectedStatus}
          onChange={(value) => onStatusChange(value as EventStatusFilter)}
          options={[
            { label: "Status: All", value: "all" },
            { label: "Success", value: "success" },
            { label: "Error", value: "error" },
          ]}
        />
        <FilterSelect
          value={selectedDateRange}
          onChange={(value) => onDateRangeChange(value as DateRangeFilter)}
          options={[
            { label: "Date: 24h", value: "24h" },
            { label: "Date: 7d", value: "7d" },
            { label: "Date: 30d", value: "30d" },
            { label: "Date: All", value: "all" },
          ]}
        />

        <div className="mx-1 h-5 w-px bg-[#1a1a1a]"></div>

        <button className="flex h-9 items-center gap-1.5 border border-dashed border-[#222] bg-[#111] px-3 text-xs font-mono text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-white whitespace-nowrap focus:outline-none">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Filter</span>
        </button>
      </div>
    </div>
  );
}

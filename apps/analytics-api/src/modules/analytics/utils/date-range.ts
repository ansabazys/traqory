import type { DateRangeQuery } from "../dto/analytics.dto.js";

const DEFAULT_RANGE_DAYS = 30;

export type DateRange = {
  from: Date;
  to: Date;
};

type DateRangeInput = DateRangeQuery | DateRange;

export function resolveDateRange(query: DateRangeInput): DateRange {
  const to = query.to ? normalizeTo(query.to) : new Date();
  const from = query.from
    ? normalizeFrom(query.from)
    : new Date(to.getTime() - DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);

  return { from, to };
}

function normalizeFrom(value: string | Date): Date {
  if (value instanceof Date) {
    return value;
  }

  return startOfDay(new Date(value));
}

function normalizeTo(value: string | Date): Date {
  if (value instanceof Date) {
    return value;
  }

  return endOfDay(new Date(value));
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

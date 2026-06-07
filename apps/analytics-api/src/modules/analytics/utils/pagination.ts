import type { EventsQuery } from "../dto/analytics.dto.js";

export type Pagination = {
  page: number;
  limit: number;
};

export function resolvePagination(query: EventsQuery): Pagination {
  return {
    page: query.page,
    limit: query.limit,
  };
}

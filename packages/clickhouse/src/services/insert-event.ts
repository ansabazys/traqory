import { clickhouse } from "../client.js";
import type { EventRecord } from "../tables/events.js";

export async function insertEvent(
  event: EventRecord,
) {
  await clickhouse.insert({
    table: "events",
    values: [event],
    format: "JSONEachRow",
  });
}
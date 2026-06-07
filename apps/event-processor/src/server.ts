import "dotenv/config";

import { createEvent } from "@traqory/database";
import { createEventsWorker } from "@traqory/queue";

const worker = createEventsWorker(
  async (job) => {
    console.log("JOB RECEIVED");

    for (const event of job.data) {
      console.log("INSERTING EVENT");

      await createEvent({
        websiteId: event.websiteId,
        event: event.event,
        path: event.path,
        url: event.url,
        ip: event.ip,
        userAgent: event.userAgent,
        timestamp: new Date(event.timestamp * 1000),
        receivedAt: new Date(event.receivedAt),
      });

      console.log("EVENT STORED");
    }
  },
);

worker.on("failed", (job, err) => {
  console.error("JOB FAILED");
  console.error(err);
});

console.log("Event processor started");
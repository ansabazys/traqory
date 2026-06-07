import "dotenv/config";

import { createEventsWorker } from "@traqory/queue";

createEventsWorker(
  async (job) => {
    console.log("Received job");
    console.log(job.data);
  },
);

console.log(
  "Event processor started",
);
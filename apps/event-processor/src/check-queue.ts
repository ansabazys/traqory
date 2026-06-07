import "dotenv/config";
import { eventsQueue } from "@traqory/queue";

console.log(await eventsQueue.getJobCounts());

const failed = await eventsQueue.getFailed();

for (const job of failed) {
  console.log("FAILED JOB:", job.id);
  console.log("Reason:", job.failedReason);
}
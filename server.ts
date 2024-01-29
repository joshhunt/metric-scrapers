import { exarotonCollector } from "./collectors/exaroton.ts";
import { registerJobs } from "./lib/cron.ts";
import { cronJob, every1Minute } from "./lib/cron.ts";

const COLLECTORS = [
  cronJob("Exaroton metrics", every1Minute, exarotonCollector),
];

registerJobs(COLLECTORS);

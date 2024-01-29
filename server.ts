import { exarotonCollector } from "./collectors/exaroton.ts";
import { registerJobs } from "./lib/cron.ts";
import { cronJob, every5Minutes } from "./lib/cron.ts";

const COLLECTORS = [
  cronJob("Exaroton metrics", every5Minutes, exarotonCollector),
];

registerJobs(COLLECTORS);

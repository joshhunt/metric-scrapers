import { exarotonCollector } from "./collectors/exaroton.ts";
import { registerJobs } from "./lib/cron.ts";
import { cronJob, every10Minutes } from "./lib/cron.ts";

const COLLECTORS = [
  cronJob("Exaroton metrics", every10Minutes, exarotonCollector),
];

registerJobs(COLLECTORS);

import { CollectorFn } from "../types.ts";
import { collectMetrics } from "./collectMetrics.ts";
import { getEnvVar } from "./env.ts";

export const every10Minutes = {
  minute: {
    every: 10,
  },
};

export function cronJob(
  name: string,
  schedule: Deno.CronSchedule,
  fn: CollectorFn
) {
  return {
    name,
    schedule,
    fn,
  };
}

export function actuallyRegisterJobs(jobs: Array<ReturnType<typeof cronJob>>) {
  for (const collector of jobs) {
    Deno.cron(collector.name, collector.schedule, async () => {
      await collectMetrics(collector.fn);
    });
  }
}

export function registerJobs(jobs: Array<ReturnType<typeof cronJob>>) {
  const isDev = getEnvVar("DENO_DEV") === "true";

  if (isDev) {
    console.log("Running in development mode, running jobs immediately");
    for (const collector of jobs) {
      collectMetrics(collector.fn);
    }
  } else {
    actuallyRegisterJobs(jobs);
  }
}

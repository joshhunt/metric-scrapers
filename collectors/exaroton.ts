import { Point } from "https://esm.sh/@influxdata/influxdb-client-browser@1.33.2";
import { Exaroton } from "../lib/exarotonApi.ts";
import { getEnvVar } from "../lib/env.ts";

const API_KEY = getEnvVar("EXAROTON_API_KEY");

export async function exarotonCollector(): Promise<Point[]> {
  const apiClient = new Exaroton(API_KEY);

  const [servers, creditPools] = await Promise.all([
    apiClient.listServers(),
    apiClient.listCreditPools(),
  ]);

  const metrics: Point[] = [];

  for (const server of servers.data) {
    const point = new Point("exaroton_server")
      .timestamp(new Date())
      .tag("id", server.id)
      .tag("name", server.name)
      .intField("status", server.status)
      .intField("players_count", server.players.count)
      .intField("players_max", server.players.count);

    metrics.push(point);
  }

  for (const creditPool of creditPools.data) {
    const point = new Point("exaroton_credit_pool")
      .timestamp(new Date())
      .tag("id", creditPool.id)
      .tag("name", creditPool.name)
      .intField("status", creditPool.credits);

    metrics.push(point);
  }

  return metrics;
}

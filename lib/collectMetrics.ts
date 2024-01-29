import { CollectorFn } from "../types.ts";
import { getEnvVar } from "./env.ts";

// const INFLUX_URL =
//   "https://influx-blocks-prod-us-central1.grafana.net/api/v1/push/influx/write";

const GRAFANA_CLOUD_INFLUX_URL = getEnvVar("GRAFANA_CLOUD_INFLUX_URL");
const GRAFANA_CLOUD_USER_ID = getEnvVar("GRAFANA_CLOUD_USER_ID");
const GRAFANA_CLOUD_METRICS_API_KEY = getEnvVar(
  "GRAFANA_CLOUD_METRICS_API_KEY"
);

export async function collectMetrics(collector: CollectorFn) {
  const metrics = await collector();

  const body = metrics.map((metric) => metric.toLineProtocol()).join("\n");
  console.log(body);

  const response = await fetch(GRAFANA_CLOUD_INFLUX_URL, {
    method: "post",
    body,
    headers: {
      Authorization: `Bearer ${GRAFANA_CLOUD_USER_ID}:${GRAFANA_CLOUD_METRICS_API_KEY}`,
      "Content-Type": "text/plain",
    },
  });
  console.log("Metrics write response:", response.status, response.statusText);
}

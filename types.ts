import { Point } from "https://esm.sh/@influxdata/influxdb-client-browser@1.33.2";

export type CollectorFn = () => Promise<Point[]>;

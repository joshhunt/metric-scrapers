import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";

const envFile = await load();

export function getEnvVar(name: string): string {
  const value = Deno.env.get(name) ?? envFile[name];

  //   if (!value) {
  //     throw new Error(`Missing environment variable ${name}`);
  //   }

  return value ?? "";
}

import "server-only";

import dotenv from "dotenv";
import { resolve } from "path";

const envFilePath = resolve(".env");
const envFile = dotenv.config({ path: envFilePath }).parsed || {};
const BASE = "https://open.api.nexon.com";

export async function nxGet<T>(
  path: string,
  qs?: Record<string, string>,
): Promise<T> {
  const url = new URL(path, BASE);
  if (qs)
    Object.entries(qs).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });
  const res = await fetch(url.toString(), {
    headers: {
      "x-nxopen-api-key": envFile.NEXON_API_KEY ?? "",
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`NEXON Open API ${res.status} ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

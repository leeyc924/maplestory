// lib/overrides.ts
import "server-only";
import { promises as fs } from "fs";
import { dirname, resolve } from "path";

const FILE = resolve("data/roster_overrides.json");

export type RosterOverride = {
  join_date?: string; // "YYYY-MM-DD" or ""
  prev_guild?: string;
  note?: string;
};
export type RosterOverrideMap = Record<string, RosterOverride>; // key: main_char

async function ensureFile() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, "{}", "utf-8");
  }
}

export async function loadOverrides(): Promise<RosterOverrideMap> {
  await ensureFile();
  const txt = await fs.readFile(FILE, "utf-8");
  return JSON.parse(txt || "{}");
}

export async function upsertOverride(
  main_char: string,
  patch: RosterOverride,
): Promise<RosterOverride> {
  const map = await loadOverrides();
  const cur = map[main_char] ?? {};
  const next = {
    ...cur,
    ...patch,
  };
  map[main_char] = next;
  await fs.writeFile(FILE, JSON.stringify(map, null, 2), "utf-8");
  return next;
}

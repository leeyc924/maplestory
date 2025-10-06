import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QueryObject {
  [key: string]: unknown;
}

export function stringify(value: unknown): string {
  switch (typeof value) {
    case "string": {
      return value;
    }
    case "number":
    case "boolean":
    case "undefined": {
      return `${value}`;
    }
    default: {
      return JSON.stringify(value);
    }
  }
}

export function stringifyQuery<T extends string = "?">(
  queryObject?: QueryObject,
  encode = true,
  initialString = "?" as T,
): T extends "?" ? `?${string}` : string {
  const parts: string[] = [];

  for (const key in queryObject) {
    const target = queryObject[key];
    const stringified = Array.isArray(target)
      ? target.join(",")
      : stringify(queryObject[key]);

    parts.push(
      `${key}=${encode ? encodeURIComponent(stringified) : stringified}`,
    );
  }

  const result = initialString + parts.join("&");
  return result as T extends "?" ? `?${string}` : string;
}

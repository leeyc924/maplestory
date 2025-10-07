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

/**
 * snake_case 문자열을 camelCase로 변환
 */
export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * camelCase 문자열을 snake_case로 변환
 */
export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * 객체의 모든 키를 snake_case에서 camelCase로 변환
 */
export function transformKeysToCamelCase<T = any>(obj: Record<string, any>): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeysToCamelCase(item)) as T;
  }

  const transformed: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamelCase(key);
    transformed[camelKey] =
      typeof value === "object" && value !== null
        ? transformKeysToCamelCase(value)
        : value;
  }

  return transformed as T;
}

/**
 * 객체의 모든 키를 camelCase에서 snake_case로 변환
 */
export function transformKeysToSnakeCase<T = any>(obj: Record<string, any>): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeysToSnakeCase(item)) as T;
  }

  const transformed: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnakeCase(key);
    transformed[snakeKey] =
      typeof value === "object" && value !== null
        ? transformKeysToSnakeCase(value)
        : value;
  }

  return transformed as T;
}

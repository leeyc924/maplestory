// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind className 유틸 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

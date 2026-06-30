import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "₹"): string {
  if (value >= 10000000) return `${currency}${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `${currency}${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `${currency}${(value / 1000).toFixed(1)}K`;
  return `${currency}${value}`;
}

export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

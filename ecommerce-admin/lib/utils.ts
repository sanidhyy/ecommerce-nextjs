import { type ClassValue, clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

// constants
import { SITE_DATA, SITE_NAME } from "@/constants";

// merge classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format currency
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// generate metadata
export const generateMetadata = (subtitle: string = ""): Metadata => {
  const data = SITE_DATA;
  data.title = SITE_NAME + ` | ${subtitle || "Admin Dashboard"}`;

  return data;
};

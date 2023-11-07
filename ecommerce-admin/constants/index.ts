// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import { Metadata } from "next";

export const SITE_NAME = "Store" as const;

export const SIDEBAR_LINKS = [
  {
    to: "",
    label: "Overview",
  },
  {
    to: "billboards",
    label: "Billboards",
  },
  {
    to: "categories",
    label: "Categories",
  },
  {
    to: "sizes",
    label: "Sizes",
  },
  {
    to: "colors",
    label: "Colors",
  },
  {
    to: "products",
    label: "Products",
  },
  {
    to: "orders",
    label: "Orders",
  },
  {
    to: "settings",
    label: "Settings",
  },
] as const;

export const EXTRA_LINKS = {
  github: "https://github.com/sanidhyy",
  source_code: "https://github.com/sanidhyy/ecommerce-nextjs",
} as const;

export const SITE_DATA: Metadata = {
  title: SITE_NAME,
  description: `A Next.js 14 E-Commerce ${SITE_NAME} Dashboard & CMS Application.`,
  authors: {
    name: "Sanidhya Kumar Verma",
    url: EXTRA_LINKS.github,
  },
  keywords: [
    "reactjs",
    "nextjs",
    "vercel",
    "react",
    "store",
    "ecommerce",
    "shadcn",
    "shadcn-ui",
    "radix-ui",
    "cn",
    "clsx",
    "zustand",
    "query-string",
    "react-hot-toast",
    "headlessui",
    "sql",
    "mysql",
    "prisma",
    "lucide-react",
    "next-pwa",
    "postcss",
    "prettier",
    "react-dom",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
  ],
  manifest: "/site.webmanifest",
};

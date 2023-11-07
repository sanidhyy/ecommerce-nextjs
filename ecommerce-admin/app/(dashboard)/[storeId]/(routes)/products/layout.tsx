import type { Metadata, Viewport } from "next";

import { generateMetadata } from "@/lib/utils";

export const metadata: Metadata = generateMetadata("Products");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

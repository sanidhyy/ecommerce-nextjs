import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// metadata
export const metadata: Metadata = generateMetadata("Product");

// viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// product layout
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

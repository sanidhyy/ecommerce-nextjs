import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// metadata
export const metadata: Metadata = generateMetadata("Category");

// viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// category layout
export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

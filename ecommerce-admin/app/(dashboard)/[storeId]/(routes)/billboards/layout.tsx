// utilities
import { generateMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";

// export page metadata
export const metadata: Metadata = generateMetadata("Billboards");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// billboard layout
export default function BillboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

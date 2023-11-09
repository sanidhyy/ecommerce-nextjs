import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

export const metadata: Metadata = generateMetadata("Colors");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

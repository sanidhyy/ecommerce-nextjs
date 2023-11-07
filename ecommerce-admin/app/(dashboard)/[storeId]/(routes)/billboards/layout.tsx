import { generateMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#111111",
};

export const metadata: Metadata = generateMetadata("Billboards");

export default function BillboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

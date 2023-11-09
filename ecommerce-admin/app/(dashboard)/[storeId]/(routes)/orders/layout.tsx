import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

export const metadata: Metadata = generateMetadata("Orders");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

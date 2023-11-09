import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Orders");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// orders layout
export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

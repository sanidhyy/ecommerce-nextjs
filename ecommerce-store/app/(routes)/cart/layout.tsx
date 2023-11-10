import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// metadata
export const metadata: Metadata = generateMetadata("Shopping Cart");

// viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// cart layout
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

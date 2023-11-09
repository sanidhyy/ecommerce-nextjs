import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Products");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// products layout
export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

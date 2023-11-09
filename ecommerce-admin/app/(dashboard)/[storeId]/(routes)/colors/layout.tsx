import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Colors");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// colors layout
export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

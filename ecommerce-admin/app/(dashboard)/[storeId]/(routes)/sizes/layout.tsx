import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Sizes");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// sizes layout
export default function SizesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

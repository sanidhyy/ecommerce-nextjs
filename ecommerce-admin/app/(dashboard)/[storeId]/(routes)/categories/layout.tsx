import type { Metadata, Viewport } from "next";

import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Categories");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// categories layout
export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata, Viewport } from "next";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Settings");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// settings layout
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

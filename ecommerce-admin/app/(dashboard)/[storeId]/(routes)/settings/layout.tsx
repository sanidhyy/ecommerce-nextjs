import type { Metadata, Viewport } from "next";

import { generateMetadata } from "@/lib/utils";

export const metadata: Metadata = generateMetadata("Settings");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

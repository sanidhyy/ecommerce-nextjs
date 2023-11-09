import { generateMetadata } from "@/lib/utils";
import { Metadata, Viewport } from "next";

// export page metadata
export const metadata: Metadata = generateMetadata("Authentication");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// auth layout
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

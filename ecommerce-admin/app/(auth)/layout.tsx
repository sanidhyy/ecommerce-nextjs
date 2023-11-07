import { generateMetadata } from "@/lib/utils";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = generateMetadata("Authentication");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

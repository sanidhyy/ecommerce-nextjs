import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { generateMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateMetadata();

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="mask-icon"
            href="icons/safari-pinned-tab.svg"
            color="#111111"
          />
          <meta
            name="msapplication-TileImage"
            content="icons/mstile-144x144.png"
          />
          <meta name="msapplication-config" content="browserconfig.xml" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

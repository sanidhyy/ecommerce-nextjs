import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

// custom provider
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// utilities
import { generateMetadata } from "@/lib/utils";

// import css
import "./globals.css";

// defining inter font
const inter = Inter({ subsets: ["latin"] });

// exporting page metadata
export const metadata: Metadata = generateMetadata();

// exporting page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* safari pinned tab (for Safari browser) */}
          <link
            rel="mask-icon"
            href="icons/safari-pinned-tab.svg"
            color="#111111"
          />
          {/* mstile image (for windows 8, 8.1 and 10) */}
          <meta
            name="msapplication-TileImage"
            content="icons/mstile-144x144.png"
          />
          {/* msapplication config (for IE and Edge browsers) */}
          <meta name="msapplication-config" content="browserconfig.xml" />
        </head>
        <body className={inter.className}>
          {/* theme provider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* toaster provider */}
            <aside>
              <ToasterProvider />
            </aside>

            {/* modal provider */}
            <aside>
              <ModalProvider />
            </aside>

            {/* children */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

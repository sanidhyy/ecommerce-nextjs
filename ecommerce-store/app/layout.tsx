import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";

// components
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

// custom provider
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

// constants
import { SITE_DATA } from "@/constants";

// import css
import "./globals.css";

// defining urbanist font
const urbanist = Urbanist({ subsets: ["latin"] });

// exporting page metadata
export const metadata: Metadata = SITE_DATA;

// exporting page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
      <body className={urbanist.className}>
        <ModalProvider />
        {/* toaster provider */}
        <aside>
          <ToastProvider />
        </aside>

        {/* header */}
        <header>
          <Navbar />
        </header>

        {/* main content */}

        {/* footer */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

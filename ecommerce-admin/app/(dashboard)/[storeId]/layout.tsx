import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// components
import Navbar from "@/components/navbar";

// utilities
import prismadb from "@/lib/prismadb";
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata("Admin Dashboard");

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// dashboard layout
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // get user id
  const { userId } = auth();

  // redirect user if not logged in
  if (!userId) redirect("/sign-in");

  // fetch store data owned by currently logged in user
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // if store doesn't exists, redirect user
  if (!store) redirect("/");

  return (
    <>
      <div>
        {/* navbar */}
        <Navbar />
        {/* content */}
        <main>{children}</main>
      </div>
    </>
  );
}

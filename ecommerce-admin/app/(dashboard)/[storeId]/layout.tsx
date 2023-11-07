import type { Metadata, Viewport } from "next";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { generateMetadata } from "@/lib/utils";

export const metadata: Metadata = generateMetadata("Admin Dashboard");

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
}

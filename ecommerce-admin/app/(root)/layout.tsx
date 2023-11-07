import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { generateMetadata } from "@/lib/utils";

export const viewport: Viewport = {
  themeColor: "#111111",
};

export const metadata: Metadata = generateMetadata();

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}

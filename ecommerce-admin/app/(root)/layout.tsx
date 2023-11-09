import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// utilities
import prismadb from "@/lib/prismadb";

// utilities
import { generateMetadata } from "@/lib/utils";

// export page metadata
export const metadata: Metadata = generateMetadata();

// export page viewport
export const viewport: Viewport = {
  themeColor: "#111111",
};

// setup layout
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetch user id
  const { userId } = auth();

  // check if user is logged in
  if (!userId) redirect("/sign-in");

  // fetch store data owned by currently logged in user.
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  // is store exists, redirect user
  if (store) {
    redirect(`/${store.id}`);
  }

  // return child
  return <>{children}</>;
}

import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import ThemeToggle from "@/components/theme-toggle";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTRA_LINKS } from "@/constants";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href={EXTRA_LINKS.source_code}
            target="_blank"
            rel="noreferrer noopener"
            title="Github"
          >
            <Button variant="outline">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

// icons
import { Github } from "lucide-react";

// components
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// utilities
import prismadb from "@/lib/prismadb";

// constants
import { EXTRA_LINKS } from "@/constants";

// navbar
const Navbar = async () => {
  // get user id
  const { userId } = auth();

  // redirect user if not logged in
  if (!userId) redirect("/sign-in");

  // fetch current user's store(s) data
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* store switcher */}
        <StoreSwitcher items={stores} />

        {/* main nav */}
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* source code link */}
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

          {/* theme toggler */}
          <ThemeToggle />

          {/* user button/icon */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

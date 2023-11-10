"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// utilities
import { cn } from "@/lib/utils";

// types
import { Category } from "@/types";

// main nav props
type MainNavProps = {
  data: Category[];
};

// main nav
const MainNav: React.FC<MainNavProps> = ({ data }) => {
  // navigation
  const pathname = usePathname();

  // routes
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {/* map over each route */}
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
          title={route.label}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;

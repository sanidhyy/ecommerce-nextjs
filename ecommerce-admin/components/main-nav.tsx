"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

// utilities
import { cn } from "@/lib/utils";

// constants
import { SIDEBAR_LINKS } from "@/constants";

// main nav
export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  // navigation
  const pathname = usePathname();
  const params = useParams();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {/* map over sidebar links */}
      {SIDEBAR_LINKS.map((route) => (
        <Link
          key={route.label}
          href={`/${params.storeId}/${route.to}`}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === `/${params.storeId}${route.to && `/${route.to}`}`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          title={route.label}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

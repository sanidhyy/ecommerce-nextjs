"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { SIDEBAR_LINKS } from "@/constants";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
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
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

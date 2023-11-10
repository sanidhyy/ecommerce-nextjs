"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { Github, ShoppingBag } from "lucide-react";

// hooks
import useCart from "@/hooks/use-cart";

// components
import Button from "@/components/ui/button";

// constants
import { EXTRA_LINKS } from "@/constants";

// navbar actions
const NavbarActions = () => {
  // states
  const router = useRouter();
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // set mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration error
  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {/* github source code */}
      <Link
        href={EXTRA_LINKS.source_code}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center rounded-full border bg-black px-2 py-2"
        title="Github"
      >
        <Github size={20} color="white" />
      </Link>

      {/* shopping cart */}
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
        title="My Cart"
      >
        <ShoppingBag size={20} color="white" />

        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;

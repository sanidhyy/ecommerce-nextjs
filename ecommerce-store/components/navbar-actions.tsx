"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, ShoppingBag } from "lucide-react";

import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";
import { EXTRA_LINKS } from "@/constants";

const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link
        href={EXTRA_LINKS.source_code}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center rounded-full border bg-black px-2 py-2"
        title="Github"
      >
        <Github size={20} color="white" />
      </Link>

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

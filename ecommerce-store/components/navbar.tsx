import Link from "next/link";

// icons
import { ShoppingCart } from "lucide-react";

// components
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";

// actions
import getCategories from "@/actions/get-categories";

// constants
import { SITE_NAME } from "@/constants";

// navbar
const Navbar = async () => {
  // fetch categories data
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          {/* brand name and logo */}
          <Link
            href="/"
            className="ml-4 flex lg:ml-0 gap-x-2"
            title={SITE_NAME}
          >
            <ShoppingCart size={20} />
            <p className="font-bold text-xl uppercase">{SITE_NAME}</p>
          </Link>

          {/* main nav */}
          <MainNav data={categories} />

          {/* navbar actions */}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

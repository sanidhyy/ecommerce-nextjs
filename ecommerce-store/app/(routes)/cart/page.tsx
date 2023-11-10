"use client";

import { useEffect, useState } from "react";

// hooks
import useCart from "@/hooks/use-cart";

// components
import Container from "@/components/ui/container";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

// cart page
const CartPage = () => {
  // states
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // set mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration error
  if (!isMounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          {/* heading */}
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>

          {/* cart items */}
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {/* no cart items */}
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}

              {/* map over each cart item */}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>

            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

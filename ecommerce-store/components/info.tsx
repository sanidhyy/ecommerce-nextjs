"use client";

import { MouseEventHandler } from "react";
import { ShoppingCart } from "lucide-react";

// components
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";

// types
import { Product } from "@/types";

// hooks
import useCart from "@/hooks/use-cart";

// info props
type InfoProps = {
  data: Product;
};

// info
const Info: React.FC<InfoProps> = ({ data }) => {
  // states
  const cart = useCart();

  // add to cart handler
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    // prevents propagation of the same event from being called
    event.stopPropagation();

    // add item to cart
    cart.addItem(data);
  };

  return (
    <div>
      {/* product name */}
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      {/* product price */}
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>

      {/* horizontal separator */}
      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        {/* size */}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>

        {/* color */}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
            title={data?.color?.name}
          />
        </div>
      </div>

      {/* add to cart btn */}
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2"
          onClick={onAddToCart}
          title="Add to Cart"
        >
          Add to Cart
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Info;

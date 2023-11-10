"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// components
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";

// hooks
import useCart from "@/hooks/use-cart";

// summary
const Summary = () => {
  // states
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // event handler(s)
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    // payment completed
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    // payment canceled
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  // total price
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // checkout handler
  const onCheckout = async () => {
    // show loader
    setLoading(true);
    // show redirect message
    toast.loading("Redirecting to checkout...", { id: "checkout-loading" });

    // checkout
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
      })
      // redirect to response url
      .then((response) => {
        window.location = response.data.url;
      })
      // catch checkout errors
      .catch((error: any) => {
        toast.error("Something went wrong during checkout.", {
          id: "checkout-loading",
        });
        console.log("Error occured during checkout: ", error);
      })
      // hide loader
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {/* order summary */}
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {/* order total */}
          <div className="text-base font-medium text-gray-900">Order total</div>

          {/* order total price */}
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* checkout btn */}
      <Button
        disabled={items.length === 0 || loading === true}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

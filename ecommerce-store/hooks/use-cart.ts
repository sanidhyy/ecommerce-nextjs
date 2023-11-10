import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

// types
import { Product } from "@/types";

// cart store type
type CartStore = {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

// use cart hook
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        // get current items in cart
        const currentItems = get().items;
        // find existing selected items from cart
        const existingItem = currentItems.find((item) => item.id === data.id);

        // if item already exists in cart
        if (existingItem) {
          return toast("Item already in cart.");
        }

        // add product(s) to cart
        set({ items: [...get().items, data] });
        // show success message
        toast.success("Item added to cart.");
      },
      // remove item from cart
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        // show success message
        toast.success("Item removed from the cart.");
      },
      // remove all items from cart
      removeAll: () => set({ items: [] }),
    }),
    // reference to local storage
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Store } from "@prisma/client";

// icons
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// utilities
import { cn } from "@/lib/utils";

// hooks
import { useStoreModal } from "@/hooks/use-store-modal";

// popover trigger props
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// store switcher props
type StoreSwitcherProps = PopoverTriggerProps & {
  items: Store[];
};

// store switcher
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  // use store modal
  const storeModal = useStoreModal();

  // navigation
  const params = useParams();
  const router = useRouter();

  // states
  const [open, setOpen] = useState(false);

  // formatted store items
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  // find current store
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  // change store on select and redirect
  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* current store icon and label */}
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
          title="Select a store"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/* select store */}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {/* search store */}
            <CommandInput
              placeholder="Search store..."
              title="Search store..."
            />
            {/* no store found */}
            <CommandEmpty>No store found.</CommandEmpty>

            {/* map over formatted store */}
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                  title={store.label}
                >
                  {/* store icon and label */}
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          {/* command separator */}
          <CommandSeparator />

          {/* create store btn */}
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                title="Create Store"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

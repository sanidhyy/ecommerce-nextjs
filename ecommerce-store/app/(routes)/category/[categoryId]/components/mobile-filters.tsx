"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Filter as FilterIcon, X } from "lucide-react";

// types
import { Color, Size } from "@/types";

// components
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

// mobile filters props
type MobileFiltersProps = {
  sizes: Size[];
  colors: Color[];
};

// mobile filters
const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  // states
  const [open, setOpen] = useState(false);

  // event handler(s)
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      {/* choose filters btn */}
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters <FilterIcon size={20} />
      </Button>

      {/* filter dialog */}
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} onClick={onClose} />} />
            </div>

            {/* render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;

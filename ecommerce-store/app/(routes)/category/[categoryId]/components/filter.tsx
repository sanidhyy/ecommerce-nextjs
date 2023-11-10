"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Button from "@/components/ui/button";

// types
import { Color, Size } from "@/types";

// utilities
import { cn } from "@/lib/utils";

// filter props
type FilterProps = {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
};

// filter
const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  // navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  // currently selected filter
  const selectedValue = searchParams.get(valueKey);

  // filter on change
  const onClick = (id: string) => {
    // get current filter
    const current = qs.parse(searchParams.toString());

    // change filter query
    const query = {
      ...current,
      [valueKey]: id,
    };

    // if filter is already selected
    if (current[valueKey] === id) {
      // deselect filter
      query[valueKey] = null;
    }

    // create new filter url
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
        fragmentIdentifier: "products",
      },
      { skipNull: true }
    );

    // push router to new url
    router.push(url);
  };
  return (
    <div className="mb-8">
      {/* filter name */}
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {/* map over each filter */}
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            {/* filter btn */}
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

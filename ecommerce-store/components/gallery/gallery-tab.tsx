import Image from "next/image";
import { Tab } from "@headlessui/react";

// utilities
import { cn } from "@/lib/utils";

// types
import { Image as ImageType } from "@/types";

// gallery tab props
type GalleryTabProps = {
  image: ImageType;
};

// gallery tab
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
      title="Product Gallery Image"
    >
      {/* selected gallery image */}
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt={`Gallery Image: ${image.url}`}
              className="object-cover object-center"
            />
          </span>

          {/* gallery image border */}
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;

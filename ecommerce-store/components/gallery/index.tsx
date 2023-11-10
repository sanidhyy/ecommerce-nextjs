"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";

// types
import { Image as ImageType } from "@/types";

// components
import GalleryTab from "@/components/gallery/gallery-tab";

// gallery props
type GalleryProps = {
  images: ImageType[];
};

// gallery
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        {/* gallery tab images */}
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>

      {/* active image */}
      <Tab.Panels className="aspect-square w-full">
        {/* image */}
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt={`Active Image: ${image.url}`}
                className="object-cover object-center"
                title="Active Product Image"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;

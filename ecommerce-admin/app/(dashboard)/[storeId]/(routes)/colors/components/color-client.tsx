"use client";

import { useParams, useRouter } from "next/navigation";

// icon
import { Plus } from "lucide-react";

// components
import { ColorColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

// color client props
type ColorClientProps = {
  data: ColorColumn[];
};

// color client
export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* heading - colors */}
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />

        {/* add new color */}
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
          title="Add new color"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      {/* horizontal separator */}
      <Separator />

      {/* colors table */}
      <DataTable columns={columns} data={data} searchKey="name" />

      {/* heading - api */}
      <Heading title="API" description="API calls for colors" />

      {/* horizontal separator */}
      <Separator />

      {/* colors api list */}
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

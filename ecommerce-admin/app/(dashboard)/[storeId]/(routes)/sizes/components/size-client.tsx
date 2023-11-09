"use client";

import { useParams, useRouter } from "next/navigation";

// icon
import { Plus } from "lucide-react";

// components
import { SizeColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

// size client props
type SizeClientProps = {
  data: SizeColumn[];
};

// size client
export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* heading - sizes */}
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        {/* add new size */}
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
          title="Add new size"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      {/* horizontal separator */}
      <Separator />

      {/* sizes table */}
      <DataTable columns={columns} data={data} searchKey="name" />

      {/* heading - api */}
      <Heading title="API" description="API calls for sizes" />

      {/* horizontal separator */}
      <Separator />

      {/* sizes api list */}
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

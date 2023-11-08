"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { SizeColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

type SizesClientProps = {
  data: SizeColumn[];
};

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
          title="Add new size"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for sizes" />
      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

"use client";

import { useParams, useRouter } from "next/navigation";

// icon
import { Plus } from "lucide-react";

// components
import { BillBoardColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

// billboard client props
type BillboardClientProps = {
  data: BillBoardColumn[];
};

// billboard client
export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* heading - billboards */}
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />

        {/* add new billboard */}
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          title="Add new billboard"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      {/* horizontal separator */}
      <Separator />

      {/* billboards table */}
      <DataTable columns={columns} data={data} searchKey="label" />

      {/* heading - api */}
      <Heading title="API" description="API calls for billboards" />
      {/* horizontal separator */}
      <Separator />

      {/* billboards api list */}
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

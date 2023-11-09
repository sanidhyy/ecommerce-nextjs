"use client";

import { useParams, useRouter } from "next/navigation";

// icon
import { Plus } from "lucide-react";

// components
import { CategoryColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

// category client props
type CategoryClientProps = {
  data: CategoryColumn[];
};

// category client
export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* heading - categories */}
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />

        {/* add new category */}
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
          title="Add new category"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      {/* horizontal separator */}
      <Separator />

      {/* categories table */}
      <DataTable columns={columns} data={data} searchKey="name" />

      {/* heading - api */}
      <Heading title="API" description="API calls for categories" />
      {/* horizontal separator */}
      <Separator />

      {/* categories api list */}
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

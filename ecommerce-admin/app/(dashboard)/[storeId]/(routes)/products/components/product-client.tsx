"use client";

import { useParams, useRouter } from "next/navigation";

// icon
import { Plus } from "lucide-react";

// components
import { ProductColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

// product client props
type ProductClientProps = {
  data: ProductColumn[];
};

// product client
export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* heading - products */}
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />

        {/* add new product */}
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
          title="Add new product"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      {/* horizontal separator */}
      <Separator />

      {/* products table */}
      <DataTable columns={columns} data={data} searchKey="name" />

      {/* heading - api */}
      <Heading title="API" description="API calls for products" />

      {/* horizontal separator */}
      <Separator />

      {/* products api list */}
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

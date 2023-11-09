"use client";

// components
import { OrderColumn, columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

// order client props
type OrderClientProps = {
  data: OrderColumn[];
};

// order client
export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      {/* heading - orders */}
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      {/* horizontal separator */}
      <Separator />

      {/* orders table */}
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
};

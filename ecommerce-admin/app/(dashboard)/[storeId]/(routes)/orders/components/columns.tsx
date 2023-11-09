"use client";

import { ColumnDef } from "@tanstack/react-table";

// icons
import { CheckCircle, XCircle } from "lucide-react";

// order column
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

// columns
export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          {row.original.isPaid ? row.original.phone : "N/A"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          {row.original.isPaid ? row.original.address : "N/A"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          {row.original.isPaid ? (
            <CheckCircle className="h-4 w-4 mx-1" />
          ) : (
            <XCircle className="h-4 w-4 mx-1" />
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

"use client";

import { toast } from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, XCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellAction } from "./cell-action";
import { MouseEventHandler } from "react";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isArchived ? (
          <CheckCircle className="h-4 w-4 mx-4" />
        ) : (
          <XCircle className="h-4 w-4 mx-4" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          {row.original.isFeatured ? (
            <CheckCircle className="h-4 w-4 mx-4" />
          ) : (
            <XCircle className="h-4 w-4 mx-4" />
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const colorName = row.original.color.split(" ")[0];
      const colorValue = row.original.color.split(" ")[1];

      const onCopy = (color: string) => {
        navigator.clipboard.writeText(color);
        toast.success("Hex code copied to the clipboard.");
      };

      return (
        <div className="flex items-center gap-x-2">
          {colorName}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="h-6 w-6 rounded-full border"
                  style={{ backgroundColor: colorValue }}
                  onClick={() => onCopy(colorValue)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{colorValue}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

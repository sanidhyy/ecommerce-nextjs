"use client";

import { ColumnDef } from "@tanstack/react-table";

// components
import { CellAction } from "./cell-action";

// billboard column
export type BillBoardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

// columns
export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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

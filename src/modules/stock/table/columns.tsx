import { ColumnDef } from "@tanstack/react-table";
import type { ShowStockType } from "@/api/stock/types";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { PaginationContext } from "../StockView";

export const columns: ColumnDef<ShowStockType>[] = [
  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => {
      const pagination = useContext(PaginationContext);
      const currentPage = pagination?.page || 0;
      const pageSize = pagination?.pageSize || 0;
      return <div>{(currentPage - 1) * pageSize + (row.index + 1)}</div>;
    },
  },
  {
    accessorKey: "product_Name",
    header: "Name",
    cell: ({ row }) => <div>{row.original?.product_Name}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.original?.stock}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.original?.price}</div>,
  },
  {
    accessorKey: "profit_Per_Item",
    header: "Profit",
    cell: ({ row }) => <div>{row.original?.profit_Per_Item}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      );
    },
  },
];

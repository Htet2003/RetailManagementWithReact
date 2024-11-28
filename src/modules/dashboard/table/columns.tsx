import { ColumnDef } from "@tanstack/react-table";
import { ReportItemType } from "@/api/dashboard/types";
import { format } from "date-fns";
import { useContext } from "react";
import { PaginationContext } from "../DashboardView";

export const columns: ColumnDef<ReportItemType>[] = [
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.original?.price}</div>,
  },
  {
    accessorKey: "sale_Quantity",
    header: "Sale Quantity",
    cell: ({ row }) => <div>{row.original?.sale_Quantity}</div>,
  },
  {
    accessorKey: "price",
    header: "Total Amount Per Item",
    cell: ({ row }) => (
      <div>{row.original?.price * row.original?.sale_Quantity}</div>
    ),
  },
  {
    accessorKey: "profit_Per_Item",
    header: "Total Profit Per Sale",
    cell: ({ row }) => (
      <div>{row.original?.profit_Per_Item * row.original?.sale_Quantity}</div>
    ),
  },
  {
    accessorKey: "created_Date",
    header: "Sale Date",
    cell: ({ row }) => {
      const date = new Date(row.original?.created_Date);
      return <div>{format(date, "MMM dd, yyyy")}</div>;
    },
  },
];

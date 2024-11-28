import { ColumnDef } from "@tanstack/react-table";
import type { ShowStockType } from "@/api/stock/types";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";
import { RootState } from "@/store";
import { useContext } from "react";
import { PaginationContext } from "../CartView";

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
    cell: ({ row }) => {
      const cartItems = useSelector((state: RootState) => state.cart.items);
      const itemInCart = cartItems.find(
        (item) => item.id === row.original?.product_Id
      );
      const itemQuantity = itemInCart ? itemInCart.quantity : 0;

      const dispatch = useDispatch();
      const handleAddToCart = () => {
        const product = {
          id: row.original?.product_Id,
          name: row.original?.product_Name,
          price: row.original?.price,
          quantity: 1,
          stock: row.original?.stock,
        };
        dispatch(addToCart(product));
      };
      return (
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={itemQuantity >= row.original?.stock}
          >
            <ShoppingCartIcon />
          </Button>
        </div>
      );
    },
  },
];

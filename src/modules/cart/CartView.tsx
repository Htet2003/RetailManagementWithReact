import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { createContext, useEffect, useMemo, useState } from "react";
import { columns } from "./table/columns";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { CartDialog } from "./chunks/CartDialog";

type PaginationContextType = {
  page: number;
  pageSize: number;
} | null;

export const PaginationContext = createContext<PaginationContextType>(null);

export const CartView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isFetching } = api.stock.fetchAllStockWithPagination.useQuery(
    page,
    pageSize
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartQuantityCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const tableData = useMemo(() => {
    return isFetching ? [] : data?.items || [];
  }, [data, isFetching]);

  useEffect(() => {
    if (cartItems.length <= 0) {
      setIsOpen(false);
    }
  }, [cartItems.length]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="p-5"
          disabled={cartItems.length <= 0}
        >
          {cartQuantityCount} <ShoppingCartIcon />
        </Button>
      </div>
      <CartDialog dialogOpen={isOpen} onClose={() => setIsOpen(false)} />
      <PaginationContext.Provider value={{ page, pageSize }}>
        <DataTable
          columns={columns}
          data={tableData}
          page={page}
          pageSize={pageSize}
          totalPages={data?.totalPages || 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </PaginationContext.Provider>
    </div>
  );
};

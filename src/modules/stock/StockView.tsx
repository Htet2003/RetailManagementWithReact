import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { createContext, useMemo, useState } from "react";
import { columns } from "./table/columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import StockDialog from "./chunks/StockDialog";

type PaginationContextType = {
  page: number;
  pageSize: number;
} | null;

export const PaginationContext = createContext<PaginationContextType>(null); // this is for pagination

export const StockView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data, isFetching } = api.stock.fetchAllStockWithPagination.useQuery(
    page,
    pageSize
  );

  const tableData = useMemo(() => {
    return isFetching ? [] : data?.items || [];
  }, [data, isFetching]);

  return (
    <div className="container mx-auto py-3">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="p-5 mb-6"
      >
        <PlusIcon /> Add Stock
      </Button>

      <StockDialog dialogOpen={isOpen} onClose={() => setIsOpen(false)} isEdit={isEdit} />

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

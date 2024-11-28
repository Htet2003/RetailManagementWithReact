import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { createContext, useMemo, useState } from "react";
import { columns } from "./table/columns";

type PaginationContextType = {
  page: number;
  pageSize: number;
} | null;

export const PaginationContext = createContext<PaginationContextType>(null);

export const StockView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching } = api.stock.fetchAllStockWithPagination.useQuery(
    page,
    pageSize
  );

  const tableData = useMemo(() => {
    return isFetching ? [] : data?.items || [];
  }, [data, isFetching]);

  return (
    <div className="container mx-auto py-10">
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

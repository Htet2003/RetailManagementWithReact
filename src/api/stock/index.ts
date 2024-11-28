import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import type {
  StockPaginationType,
} from "./types";
import { APIResponse } from "@/shared/types";
import stockServices from "./services";

export const fetchAllStockWithPagination = {
  useQuery: (
    page: number,
    pageSize: number,
    opt?: Partial<UseQueryOptions<StockPaginationType, Error>>
  ) =>
    useQuery<StockPaginationType, Error>({
      queryKey: ["fetchAllStockWithPagination", page, pageSize],
      enabled: !!page && !!pageSize,
      queryFn: async () => {

        console.log("fetchAllStockWithPagination");
        const response: APIResponse<StockPaginationType> =
          await stockServices.fetchAllStockWithPagination(page, pageSize);

        return response.data;
      },
      ...opt,
    }),
};

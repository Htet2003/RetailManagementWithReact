import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { ReportPaginationType } from "./types";
import { APIResponse } from "@/shared/types";
import dashboardService from "./services";

export const fetchAllSalesReportWithPagination = {
    useQuery: (
      page: number,
      pageSize: number,
      startDate?: string,
      endDate?: string,
      opt?: Partial<UseQueryOptions<ReportPaginationType, Error>>
    ) =>
      useQuery<ReportPaginationType, Error>({
        queryKey: ["fetchAllSalesReportWithPagination", page, pageSize, startDate, endDate],
        enabled: !!page && !!pageSize,
        queryFn: async () => {
          console.log("fetchAllSalesReportWithPagination");
          const response: APIResponse<ReportPaginationType> =
            await dashboardService.fetchAllSalesReportWithPagination(page, pageSize, startDate, endDate);
  
          return response.data;
        },
        ...opt,
      }),
  };
  

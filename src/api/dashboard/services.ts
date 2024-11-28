import type { ReportPaginationType } from "./types";
import axios from "axios";
import { APIResponse } from "@/shared/types";

const baseUrl = "/Sale";

const fetchAllSalesReportWithPagination = async (
  page: number,
  pageSize: number,
  startDate?: string,
  endDate?: string
): Promise<APIResponse<ReportPaginationType>> => {
  // Construct query parameters dynamically
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  // Add optional parameters if provided
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await axios.get<APIResponse<ReportPaginationType>>(
    `${baseUrl}/GetAllSalesWithProductData?${params.toString()}`
  );

  return response.data;
};

export default {
  fetchAllSalesReportWithPagination,
};

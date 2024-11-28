import type { StockPaginationType } from "./types";
import axios from "axios";
import { APIResponse } from "@/shared/types";

const baseUrl = "/Product";

const fetchAllStockWithPagination = async (
  page: number,
  pageSize: number
): Promise<APIResponse<StockPaginationType>> => {
  const response = await axios.get<APIResponse<StockPaginationType>>(
    `${baseUrl}/GetAllProductsWithPagination?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export default {
  fetchAllStockWithPagination,
};

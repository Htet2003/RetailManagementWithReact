export type StockPaginationType = {
  items: ShowStockType[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type ShowStockType = {
  product_Id: string;
  product_Name: string;
  stock: number;
  price: number;
  profit_Per_Item: number;
};

export type AddStockPayload = {
  product_Name: string;
  stock: number;
  price: number;
  profit_Per_Item: number;
};

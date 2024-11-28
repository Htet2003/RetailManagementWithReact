export type ReportPaginationType = {
    items: ReportItemType[]
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    totalRevenue: number
    totalProfit: number
  }
  
  export type ReportItemType = {
    sale_Id: string
    product_Id: string
    sale_Quantity: number
    product_Name: string
    price: number
    profit_Per_Item: number
    created_Date: string
  }
  
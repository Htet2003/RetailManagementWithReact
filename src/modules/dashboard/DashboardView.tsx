import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { useMemo, useState, useEffect, createContext } from "react";
import { columns } from "./table/columns";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PaginationContextType = {
  page: number;
  pageSize: number;
} | null;

export const PaginationContext = createContext<PaginationContextType>(null);

const DashboardView = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // Update startDate and endDate whenever the date range changes
  useEffect(() => {
    if (date?.from) {
      setStartDate(format(date.from, "yyyy-MM-dd")); // Ensure correct format
    } else {
      setStartDate(""); // Reset if no start date
    }

    if (date?.to) {
      setEndDate(format(date.to, "yyyy-MM-dd")); // Ensure correct format
    } else {
      setEndDate(""); // Reset if no end date
    }
  }, [date]);

  const { data, isFetching } =
    api.dashboard.fetchAllSalesReportWithPagination.useQuery(
      page,
      pageSize,
      startDate,
      endDate
    );

  const totalRevenue = data?.totalRevenue || 0;
  const totalProfit = data?.totalProfit || 0;

  const tableData = useMemo(() => {
    return isFetching ? [] : data?.items || [];
  }, [data, isFetching]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center p-6">
        <div className="font-bold text-xl mb-2 text-gray-800 mr-6">
          Total Revenue:
          <span className="text-green-600">{totalRevenue}</span>
        </div>
        <div className="font-bold text-xl mb-2 text-gray-800">
          Total Profit:
          <span className="text-green-600">{totalProfit}</span>
        </div>

        <div className={cn("grid gap-2 ml-auto", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from || new Date()}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

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

export default DashboardView;

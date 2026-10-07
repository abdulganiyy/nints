import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps<T> {
  table: Table<T>;
  total: number;
}

export function Pagination<T>({ table, total }: PaginationProps<T>) {
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const currentPage = table.getState().pagination.pageIndex;

  const pages: (number | "...")[] = [];

  // First four pages
  const firstPages = Math.min(4, pageCount);

  for (let i = 0; i < firstPages; i++) {
    pages.push(i);
  }

  // Ellipsis
  if (pageCount > 5) {
    pages.push("...");
  }

  // Last page
  if (pageCount > 4) {
    pages.push(pageCount - 1);
  }

  // const total = table.getFilteredRowModel().rows.length;

  const start = total === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, total);

  return (
    <div className="flex items-center gap-2 justify-between border-t pt-2">
      <span className="text-sm text-[#B5B7C0]">
        Showing data {start} to {end} of{" "}
        {new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(total)}{" "}
        entries
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EEEEEE] text-[#404B52] transition-colors hover:bg-[#E2E2E2] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={page}
              onClick={() => table.setPageIndex(page)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md bg-[#EEEEEE] text-[#404B52] transition-colors hover:bg-[#E2E2E2] disabled:cursor-not-allowed disabled:opacity-40",
                {
                  "bg-primary text-white": currentPage === page,
                },
              )}
            >
              {page + 1}
            </button>
          ),
        )}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EEEEEE] text-[#404B52] transition-colors hover:bg-[#E2E2E2] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

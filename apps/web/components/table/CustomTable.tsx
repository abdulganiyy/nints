"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  RowSelectionState,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Pagination } from "./Pagination";
import { Trash2 } from "lucide-react";
import { TableEmptyState } from "./TableEmptyState";

type TableFilter = {
  column: string;
  label: string;
  type: "text" | "select";

  options?: {
    label: string;
    value: string;
  }[];
};

type CustomTableProps<T extends { id: string }> = {
  data: T[];
  columns: ColumnDef<T>[];
  onDeleteSelected?: (ids: string[]) => void;
  filters?: TableFilter[];
  searcheable?: boolean;
  showPagination?: boolean;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  meta: {
    total: number;
    limit: number;
  };
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
};

export function CustomTable<T extends { id: string }>({
  data,
  columns,
  onDeleteSelected,
  filters,
  searcheable,
  meta,
  pagination,
  onPaginationChange,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  showPagination = true,
}: CustomTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns,
    data,
    enableRowSelection: true,
    manualPagination: true,
    rowCount: meta?.total ?? 0,
    initialState: {},
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      pagination,
    },

    onPaginationChange: onPaginationChange,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  const selectedRows = table.getSelectedRowModel().rows;

  function deleteSelected() {
    const ids = selectedRows.map((row) => row.original.id);

    onDeleteSelected?.(ids);

    table.resetRowSelection();
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end items-center py-2">
        {searcheable && (
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-54 bg-[#F9FBFF]"
          />
        )}
        <div className="flex gap-3">
          {filters?.map((filter) => {
            if (filter.type === "text") {
              return (
                <Input
                  className="bg-[#F9FBFF]"
                  key={filter.column}
                  placeholder={filter.label}
                  value={
                    (table
                      .getColumn(filter.column)
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) =>
                    table
                      .getColumn(filter.column)
                      ?.setFilterValue(e.target.value)
                  }
                />
              );
            }

            return (
              <Select
                key={filter.column}
                value={
                  (table
                    ?.getColumn(filter.column)
                    ?.getFilterValue() as string) ?? ""
                }
                onValueChange={(value) =>
                  table
                    .getColumn(filter.column)
                    ?.setFilterValue(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger className="w-38.5 bg-[#F9FBFF]">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          })}
        </div>
        {selectedRows.length > 0 && (
          <div className="flex items-center justify-between gap-2 p-3">
            <span className="text-sm font-medium">
              {selectedRows.length} selected
            </span>

            <Button variant="destructive" onClick={deleteSelected}>
              <Trash2 />
            </Button>
          </div>
        )}
      </div>
      <Table>
        <TableHeader className="border-t">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-72"
              >
                <TableEmptyState
                  title={emptyTitle}
                  description={emptyDescription}
                  actionLabel={emptyActionLabel}
                  onAction={onEmptyAction}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showPagination && (
        <div className="p-2">
          <Pagination table={table} total={meta?.total} />
        </div>
      )}
    </div>
  );
}

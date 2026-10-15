"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomTable } from "@/components/table/CustomTable";
import axios from "axios";
import { format } from "date-fns";
import { createSelectionColumn } from "@/components/table/SelectionColumn";
import { buildQueryParams } from "@/utils/helper-function";
import ErrorState from "@/components/ErrorState";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { Transaction } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import TransactionDetails from "@/components/admin/transaction/TransactionDetails";

export default function TransactionPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["transactions", pagination],
    queryFn: async () => {
      const params = buildQueryParams({
        page: String(pagination.pageIndex + 1),
        limit: String(pagination.pageSize),
      });
      const res = await axios.get<any>(
        `/api/admin/transaction?${params.toString()}`,
      );
      return res.data;
    },
  });

  function handleDelete(ids: string[]) {}

  if (isLoading) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  if (isError) {
    return (
      <ErrorState
        title={error?.message ?? "Unable to load transactions"}
        description="Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  console.log(data);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-[#1F384C] text-lg leading-5.75">
          Transaction Management
        </h2>
      </div>
      <div>
        <CustomTable
          data={data?.data as Transaction[]}
          onDeleteSelected={handleDelete}
          columns={[
            createSelectionColumn<Transaction>(),
            {
              accessorKey: "id",
              header:"Transaction ID",
           
            },
            {
              id: "description",
              header: "Description",
              cell: ({ row }) => {
                return <div>{`${row.original.description}`}</div>;
              },
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ row }) => {
                return (
                  <StatusBadge
                    type="userStatus"
                    status={row.original.status}
                  ></StatusBadge>
                );
              },
            },

            {
              accessorKey: "createdAt",
              header: "Created",
              cell: ({ row }) => {
                return (
                  <>
                    {format(
                      new Date(row.getValue("createdAt")),
                      "yyyy-MM-dd HH:mm",
                    )}
                  </>
                );
              },
            },
            {
              header: "Actions",
              cell: ({ row }) => (
                <div className="flex gap-2">
                  <TransactionDetails transaction={row.original} />
                </div>
              ),
            },
          ]}
          searcheable
          meta={data?.meta as { total: number; limit: number }}
          pagination={pagination}
          onPaginationChange={setPagination}
          emptyTitle="No transactions yet"
          emptyActionLabel="New Transaction"
        />
      </div>
    </div>
  );
}

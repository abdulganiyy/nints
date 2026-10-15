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
import ReferralDetails from "@/components/admin/referral/ReferralDetails";
import { Referral } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";

export default function ReferralPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["referrals", pagination],
    queryFn: async () => {
      const params = buildQueryParams({
        page: String(pagination.pageIndex + 1),
        limit: String(pagination.pageSize),
      });
      const res = await axios.get<any>(`/api/referral/admin?${params.toString()}`);
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
        title={error?.message ?? "Unable to load referrals"}
        description="Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  console.log(data);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-[#1F384C] text-lg leading-5.75">Referral Management</h2>

       
      </div>
      <div>
        <CustomTable
          data={data?.data as Referral[]}
          onDeleteSelected={handleDelete}
          columns={[
            createSelectionColumn<Referral>(),
                     {
              id: "referrer email",
              header: "Referrer User Email",
              cell: ({ row }) => {
                return (
                  <div>{`${row.original.referrer.email}`}</div>
                );
              },
            },
                    {
              id: "referred user email",
              header: "Referred User Email",
              cell: ({ row }) => {
                return (
                  <div>{`${row.original.referredUser.email}`}</div>
                );
              },
            },
            {
              accessorKey: "status",
              header: "Status",
              cell:({row}) => {

                return  <StatusBadge
                          type="userStatus"
                          status={row.original.status}
                        ></StatusBadge>
              }
            },
 
            {
              accessorKey: "completedAt",
              header: "Completed",
              cell: ({ row }) => {
                return (
                  <>
                    {format(
                      new Date(row.getValue("completedAt")),
                      "yyyy-MM-dd HH:mm",
                    )}
                  </>
                );
              },
            },
            {
                id:"rewards amount",
                header:"RewardsAmount",
                cell:({row})=>{

                    return <span>{new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 2,
          }).format(Number(row.original.rewards))}</span>
                }
            },
            {
              header: "Actions",
              cell: ({ row }) => (
                <div className="flex gap-2">
                  <ReferralDetails referral={row.original} />
              
                </div>
              ),
            },
          ]}
          searcheable
          meta={data?.meta as { total: number; limit: number }}
          pagination={pagination}
          onPaginationChange={setPagination}
          emptyTitle="No referrals yet"
          emptyActionLabel="New Referral"
        />
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { CustomTable } from "@/components/table/CustomTable";
// import axios from "axios";
// import { format } from "date-fns";
// import { createSelectionColumn } from "@/components/table/SelectionColumn";
// import { buildQueryParams } from "@/utils/helper-function";
// import ErrorState from "@/components/ErrorState";
// import { TableSkeleton } from "@/components/table/TableSkeleton";
// import UserDetails from "@/components/user/UserDetails";
// import { User } from "@/types";
// import EditUser from "@/components/user/EditUser";
// import DeleteUser from "@/components/user/DeleteUser";
// import CreateNewUser from "@/components/user/CreateNewUser";
// import { StatusBadge } from "@/components/StatusBadge";

// export default function UserPage() {
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const [openCreateNewGuestDialog, setOpenCreateNewGuestDialog] =
//     useState(false);

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["users", pagination],
//     queryFn: async () => {
//       const params = buildQueryParams({
//         page: String(pagination.pageIndex + 1),
//         limit: String(pagination.pageSize),
//       });
//       const res = await axios.get<any>(`/api/user?${params.toString()}`);
//       return res.data;
//     },
//   });

//   function handleDelete(ids: string[]) {}

//   if (isLoading) {
//     return <TableSkeleton rows={10} columns={7} />;
//   }

//   if (isError) {
//     return (
//       <ErrorState
//         title={error?.message ?? "Unable to load users"}
//         description="Please check your connection and try again."
//         onRetry={refetch}
//       />
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between">
//         <h2 className="text-[#1F384C] text-lg leading-5.75">User Management</h2>

//         <CreateNewUser
//           openDialog={openCreateNewGuestDialog}
//           setOpenDialog={setOpenCreateNewGuestDialog}
//         />
//       </div>
//       <div>
//         <CustomTable
//           data={data?.data as User[]}
//           onDeleteSelected={handleDelete}
//           columns={[
//             createSelectionColumn<User>(),

//             {
//               accessorKey: "fullname",
//               header: "User Name",
//             },
//             {
//               accessorKey: "roles",
//               header: "Roles",
//               cell: ({ row }) => {
//                 const roles = row.getValue("roles") as {
//                   id: string;
//                   name: string;
//                 }[];

//                 return (
//                   <div className="space-x-1">
//                     {roles.map((role) => {
//                       return (
//                         <StatusBadge
//                           key={role.id}
//                           type="role"
//                           status={role.name}
//                         ></StatusBadge>
//                       );
//                     })}
//                   </div>
//                 );
//               },
//             },

//             {
//               accessorKey: "phone",
//               header: "Phone Number",
//             },
//             {
//               accessorKey: "email",
//               header: "Email",
//             },
//             {
//               accessorKey: "lastLogin",
//               header: "Last Login",
//               cell: ({ row }) => {
//                 return (
//                   <>
//                     {format(
//                       new Date(row.getValue("lastLogin")),
//                       "yyyy-MM-dd HH:mm",
//                     )}
//                   </>
//                 );
//               },
//             },
//             {
//               header: "Actions",
//               cell: ({ row }) => (
//                 <div className="flex gap-2">
//                   <UserDetails user={row.original} />
//                   <EditUser user={row.original} />
//                   <DeleteUser user={row.original} />
//                 </div>
//               ),
//             },
//           ]}
//           searcheable
//           // filters={[
//           //   {
//           //     column: "status",
//           //     label: "Sort by status",
//           //     type: "select",
//           //     options: [
//           //       { label: "Active", value: "ACTIVE" },
//           //       { label: "Pending", value: "PENDING" },
//           //     ],
//           //   },
//           // ]}
//           meta={data?.meta as { total: number; limit: number }}
//           pagination={pagination}
//           onPaginationChange={setPagination}
//           emptyTitle="No users yet"
//           emptyDescription="Create your first user to get started."
//           emptyActionLabel="New User"
//           onEmptyAction={() => {
//             setOpenCreateNewGuestDialog(true);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

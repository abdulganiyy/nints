import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard-summary"],

    queryFn: async () => {
      const { data } = await axios.get("/api/admin/dashboard");

      return data;
    },

    staleTime: 30_000,

    refetchInterval: 60_000,
  });
}

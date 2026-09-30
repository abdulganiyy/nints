"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUser() {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/me");

      return response.data;
    },
    queryKey: ["user"],
  });
}

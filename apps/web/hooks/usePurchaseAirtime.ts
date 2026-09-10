"use client";

import { useMutation } from "@tanstack/react-query";

import { purchaseAirtime } from "@/services/airtime.service";

export function usePurchaseAirtime() {
  return useMutation({
    mutationFn: purchaseAirtime,

    retry: false,
  });
}

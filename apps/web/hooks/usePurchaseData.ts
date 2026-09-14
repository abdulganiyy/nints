"use client";

import { useMutation } from "@tanstack/react-query";
import { purchaseData } from "@/services/data.service";

export function usePurchaseData() {
  return useMutation({
    mutationFn: purchaseData,

    retry: false,
  });
}

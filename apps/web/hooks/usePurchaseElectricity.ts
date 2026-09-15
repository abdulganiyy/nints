"use client";

import { useMutation } from "@tanstack/react-query";
import { purchaseElectricity } from "@/services/electricity.service";

export function usePurchaseElectricity() {
  return useMutation({
    mutationFn: purchaseElectricity,

    retry: false,
  });
}

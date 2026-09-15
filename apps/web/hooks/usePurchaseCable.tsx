"use client";

import { useMutation } from "@tanstack/react-query";
import { purchaseCable } from "@/services/cable.service";

export function usePurchaseCable() {
  return useMutation({
    mutationFn: purchaseCable,

    retry: false,
  });
}

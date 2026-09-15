import type { CablePurchasePayload, CablePurchaseResponse } from "@/types";
import axios from "axios";

export async function purchaseCable(payload: CablePurchasePayload) {
  const { data } = await axios.post<CablePurchaseResponse>(
    "/api/vtu/purchase-cable",
    payload,
  );

  return data;
}

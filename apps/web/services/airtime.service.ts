import type { AirtimePurchasePayload, AirtimePurchaseResponse } from "@/types";
import axios from "axios";

export async function purchaseAirtime(payload: AirtimePurchasePayload) {
  const { data } = await axios.post<AirtimePurchaseResponse>(
    "/api/vtu/purchase-airtime",
    payload,
  );

  return data;
}

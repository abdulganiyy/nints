import type { DataPurchasePayload, DataPurchaseResponse } from "@/types";
import axios from "axios";

export async function purchaseData(payload: DataPurchasePayload) {
  const { data } = await axios.post<DataPurchaseResponse>(
    "/api/vtu/purchase-data",
    payload,
  );

  return data;
}

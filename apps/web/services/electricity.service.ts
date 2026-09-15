import type {
  ElectricityPurchasePayload,
  ElectricityPurchaseResponse,
} from "@/types";
import axios from "axios";

export async function purchaseElectricity(payload: ElectricityPurchasePayload) {
  const { data } = await axios.post<ElectricityPurchaseResponse>(
    "/api/vtu/purchase-electricity",
    payload,
  );

  return data;
}

import { ReferralInfo } from "@/types";
import axios from "axios";

export async function getReferralInfo(): Promise<ReferralInfo> {
  const { data } = await axios.get<ReferralInfo>("/api/referral/stats");

  return data;
}

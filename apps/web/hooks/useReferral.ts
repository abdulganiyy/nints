import { useQuery } from "@tanstack/react-query";

import { getReferralInfo } from "@/services/referral.service";

export function useReferral() {
  return useQuery({
    queryKey: ["referral"],
    queryFn: getReferralInfo,
  });
}

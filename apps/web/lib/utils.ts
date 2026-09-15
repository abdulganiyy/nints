import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum NigerianNetwork {
  MTN = "MTN",
  AIRTEL = "AIRTEL",
  GLO = "GLO",
  NINEMOBILE = "9MOBILE",
}

const NETWORK_PREFIXES: Record<string, NigerianNetwork> = {
  // MTN
  "0803": NigerianNetwork.MTN,
  "0806": NigerianNetwork.MTN,
  "0810": NigerianNetwork.MTN,
  "0813": NigerianNetwork.MTN,
  "0814": NigerianNetwork.MTN,
  "0816": NigerianNetwork.MTN,
  "0903": NigerianNetwork.MTN,
  "0906": NigerianNetwork.MTN,
  "0913": NigerianNetwork.MTN,
  "0916": NigerianNetwork.MTN,
  "0703": NigerianNetwork.MTN,
  "0704": NigerianNetwork.MTN,
  "0702": NigerianNetwork.MTN,

  // Airtel
  "0802": NigerianNetwork.AIRTEL,
  "0808": NigerianNetwork.AIRTEL,
  "0812": NigerianNetwork.AIRTEL,
  "0701": NigerianNetwork.AIRTEL,
  "0708": NigerianNetwork.AIRTEL,
  "0901": NigerianNetwork.AIRTEL,
  "0902": NigerianNetwork.AIRTEL,
  "0904": NigerianNetwork.AIRTEL,
  "0907": NigerianNetwork.AIRTEL,
  "0912": NigerianNetwork.AIRTEL,

  // Glo
  "0805": NigerianNetwork.GLO,
  "0807": NigerianNetwork.GLO,
  "0811": NigerianNetwork.GLO,
  "0815": NigerianNetwork.GLO,
  "0705": NigerianNetwork.GLO,
  "0905": NigerianNetwork.GLO,
  "0915": NigerianNetwork.GLO,

  // 9mobile
  "0809": NigerianNetwork.NINEMOBILE,
  "0817": NigerianNetwork.NINEMOBILE,
  "0818": NigerianNetwork.NINEMOBILE,
  "0908": NigerianNetwork.NINEMOBILE,
  "0909": NigerianNetwork.NINEMOBILE,
};

export function normalizeNigerianPhone(phone: string) {
  let value = phone.replace(/\s/g, "");

  if (value.startsWith("+234")) {
    value = "0" + value.slice(4);
  }

  if (value.startsWith("234")) {
    value = "0" + value.slice(3);
  }

  return value;
}

export function detectNetwork(phone: string) {
  const normalized = normalizeNigerianPhone(phone);

  if (!/^0[789]\d{9}$/.test(normalized)) {
    return null;
  }

  const prefix = normalized.substring(0, 4);

  return NETWORK_PREFIXES[prefix] ?? null;
}

export type DataPlan = {
  plan_code: string;
  label: string;
  network: string;
  amount: number;
};

export type Network = "MTN" | "AIRTEL" | "GLO" | "9MOBILE";

export const NETWORK_MAP: Record<string, Network> = {
  mtn_gifting_data: "MTN",
  mtn_data_share: "MTN",

  airtel_data: "AIRTEL",

  glo_data: "GLO",

  "9mobile_data": "9MOBILE",
};

export function groupDataPlansByNetwork(plans: DataPlan[]) {
  return plans.reduce<Record<Network, DataPlan[]>>(
    (groups, plan) => {
      const network = NETWORK_MAP[plan.network];

      if (!network) {
        return groups;
      }

      groups[network].push(plan);

      return groups;
    },
    {
      MTN: [],
      AIRTEL: [],
      GLO: [],
      "9MOBILE": [],
    },
  );
}

export function getMtnCategory(plan: DataPlan) {
  switch (plan.network) {
    case "mtn_gifting_data":
      return "GIFTING";

    case "mtn_data_share":
      return "DATA_SHARE";

    default:
      return null;
  }
}

export type CableProvider = "Startimes" | "DSTV" | "GOTV";

export type CablePlan = {
  plan_code: string;
  description: string;
  display: string;
  amount: number;
  provider: CableProvider;
};

export function groupCablePlansByProvider(plans: CablePlan[]) {
  return plans.reduce<Record<CableProvider, CablePlan[]>>(
    (groups, plan) => {
      groups[plan.provider].push(plan);

      return groups;
    },
    {
      Startimes: [],
      GOTV: [],
      DSTV: [],
    },
  );
}

export type ElectricityPlan = {
  plan_code: string;
  plan_name: string;
  plan_id: string;
  min_amount: number;
  max_amount: number;
  provider: CableProvider;
};

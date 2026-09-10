"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { AIRTIME_NETWORKS, AirtimeNetwork } from "@/types";

type Props = {
  value?: AirtimeNetwork;
  onChange: (network: AirtimeNetwork) => void;
  disabled?: boolean;
};

const networkDescription: Record<AirtimeNetwork, string> = {
  MTN: "MTN Nigeria",
  AIRTEL: "Airtel Nigeria",
  GLO: "Globacom Nigeria",
  "9MOBILE": "9mobile Nigeria",
};

export default function AirtimeProviders({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {AIRTIME_NETWORKS.map((network) => {
        const selected = value === network;

        return (
          <button
            key={network}
            type="button"
            disabled={disabled}
            onClick={() => onChange(network)}
            className={cn(
              "relative rounded-xl border p-4 text-left",
              "transition-all duration-200",
              "hover:border-primary hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              selected && "border-primary bg-primary/5 ring-2 ring-primary/20",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {selected && (
              <div className="absolute right-2 top-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              </div>
            )}

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold">
              {network === "9MOBILE" ? "9" : network.charAt(0)}
            </div>

            <div className="mt-3">
              <p className="font-semibold">{network}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                {networkDescription[network]}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

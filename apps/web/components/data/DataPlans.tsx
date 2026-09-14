"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { groupDataPlansByNetwork, DataPlan, cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  plans: DataPlan[];
  network: string;
  onSelectNetwork: (network: string) => void;
  selectedPlan: DataPlan | null;
  onSelectPlan: (plan: DataPlan) => void;
};

export default function DataPlans({
  plans,
  network = "MTN",
  onSelectNetwork,
  selectedPlan,
  onSelectPlan,
}: Props) {
  const groupedPlans = groupDataPlansByNetwork(plans);

  return (
    <Tabs
      defaultValue="MTN"
      value={network.toUpperCase()}
      onValueChange={onSelectNetwork}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="MTN">MTN</TabsTrigger>

        <TabsTrigger value="AIRTEL">Airtel</TabsTrigger>

        <TabsTrigger value="GLO">Glo</TabsTrigger>

        <TabsTrigger value="9MOBILE">9mobile</TabsTrigger>
      </TabsList>

      <TabsContent value="MTN">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.MTN}
        />
      </TabsContent>

      <TabsContent value="AIRTEL">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.AIRTEL}
        />
      </TabsContent>

      <TabsContent value="GLO">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.GLO}
        />
      </TabsContent>

      <TabsContent value="9MOBILE">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans["9MOBILE"]}
        />
      </TabsContent>
    </Tabs>
  );
}

function PlanList({
  plans,
  selectedPlan,
  onSelectPlan,
}: {
  plans: DataPlan[];
  selectedPlan: DataPlan | null;
  onSelectPlan: (plan: DataPlan) => void;
}) {
  if (plans.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        No data plans available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {plans.map((plan) => {
        const selected = selectedPlan?.plan_code === plan.plan_code;
        return (
          <button
            key={plan.label}
            type="button"
            // className="rounded-lg border p-4 text-left hover:border-primary"
            onClick={() => onSelectPlan(plan)}
            className={cn(
              "relative rounded-xl border p-4 text-left",
              "transition-all duration-200",
              "hover:border-primary hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              selected && "border-primary bg-primary/5 ring-2 ring-primary/20",
              //   disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {selected && (
              <div className="absolute right-2 top-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              </div>
            )}

            <p className="font-semibold">{plan.label}</p>

            <p className="mt-2 text-lg font-bold">
              ₦{plan.amount.toLocaleString()}
            </p>
          </button>
        );
      })}
    </div>
  );
}

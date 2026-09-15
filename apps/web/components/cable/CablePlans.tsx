"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn, CablePlan, groupCablePlansByProvider } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  plans: CablePlan[];
  provider: string;
  onSelectProvider: (provider: string) => void;
  selectedPlan: CablePlan | null;
  onSelectPlan: (plan: CablePlan) => void;
};

export default function CablePlans({
  plans,
  provider = "Startimes",
  onSelectProvider,
  selectedPlan,
  onSelectPlan,
}: Props) {
  const groupedPlans = groupCablePlansByProvider(plans);

  return (
    <Tabs
      defaultValue="Startimes"
      value={provider}
      onValueChange={(value) => {
        console.log(value);
        onSelectProvider(value);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="Startimes">Startimes</TabsTrigger>

        <TabsTrigger value="GOTV">GOTV</TabsTrigger>

        <TabsTrigger value="DSTV">DSTV</TabsTrigger>
      </TabsList>

      <TabsContent value="Startimes">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.Startimes}
        />
      </TabsContent>

      <TabsContent value="GOTV">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.GOTV}
        />
      </TabsContent>

      <TabsContent value="DSTV">
        <PlanList
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          plans={groupedPlans.DSTV}
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
  plans: CablePlan[];
  selectedPlan: CablePlan | null;
  onSelectPlan: (plan: CablePlan) => void;
}) {
  console.log(plans);

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
            key={plan.description}
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

            <p className="font-semibold">{plan.description}</p>

            <p className="mt-2 text-lg font-bold">
              ₦{plan.amount.toLocaleString()}
            </p>
          </button>
        );
      })}
    </div>
  );
}

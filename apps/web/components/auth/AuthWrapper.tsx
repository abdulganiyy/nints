import {
  Wallet,
  PiggyBank,
  Smartphone,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Digital Wallet",
    icon: Wallet,
  },
  {
    title: "Savings Goals",
    icon: PiggyBank,
  },
  {
    title: "Airtime & Data",
    icon: Smartphone,
  },
  {
    title: "Quick Loans",
    icon: CreditCard,
  },
];

export default function AuthSideBanner() {
  return (
    <div className="flex h-full flex-col justify-between bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-600 p-12 text-white">
      <div>
        <h1 className="text-4xl font-bold">Nints</h1>

        <p className="mt-8 text-5xl font-bold leading-tight">
          Banking Made
          <br />
          Simple.
        </p>

        <p className="my-8 text-lg text-emerald-100">
          Wallet, Airtime, Savings, Bills and Loans from one secure platform.
        </p>
      </div>

      <div className="space-y-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur"
            >
              <Icon className="h-7 w-7" />

              <span className="text-lg">{feature.title}</span>

              <CheckCircle2 className="ml-auto h-5 w-5" />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-5">
        <ShieldCheck className="h-10 w-10" />

        <div>
          <h4 className="font-semibold">Secure Platform</h4>

          <p className="text-sm text-emerald-100">
            Protected with encryption and identity verification.
          </p>
        </div>
      </div>
    </div>
  );
}

import AirtimePurchase from "@/components/airtime/AirtimePurchase";

export default async function AirtimePage() {
  // Replace with your actual server-side
  // wallet/user query.

  const walletBalance = 797.25;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <AirtimePurchase walletBalance={walletBalance} />
    </main>
  );
}

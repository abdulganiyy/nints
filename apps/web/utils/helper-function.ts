export function buildQueryParams(
  params: Record<string, unknown>,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}

export interface FundingQuote {
  amount: number;
  fee: number;
  totalToTransfer: number;
  amountCredited: number;
}


export function calculateFundingQuote(amountKobo: number) {
  const platformFeeKobo = 10_000; // ₦100
  const paystackRate = 0.01;
  const paystackCapKobo = 30_000; // ₦300

  // Calculate total before processing fee
  const baseAmountKobo = amountKobo + platformFeeKobo;

  // Gross up to account for Paystack's 1% charge
  const totalAmountKobo = Math.ceil(
    baseAmountKobo / (1 - paystackRate),
  );

  const paystackFeeKobo = Math.min(
    Math.ceil(totalAmountKobo * paystackRate),
    paystackCapKobo,
  );

  const finalTotalKobo = amountKobo + platformFeeKobo + paystackFeeKobo;

  return {
    amountKobo,
    platformFeeKobo,
    paystackFeeKobo,
    totalAmountKobo: finalTotalKobo,

    // Naira values for display
    amount:amountKobo/ 100,
    amountCredited: amountKobo / 100,
    fee:(platformFeeKobo + paystackFeeKobo)/ 100,
    totalToTransfer: finalTotalKobo / 100,
    platformFee: platformFeeKobo / 100,
    paystackFee: paystackFeeKobo / 100,
  };
}
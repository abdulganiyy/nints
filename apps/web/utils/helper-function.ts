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

const FUNDING_FEE_RATE = 0.01; // Example: 1.5%
const PLATFORM_FEE_RATE = 0.005; // Example: 0.5%
const PLATFORM_FEE_FLAT = 100; // Example: ₦50
const MAXIMUM_FEE = 300; // Example: ₦20

export function calculateFundingQuote(
  amount: number,
): FundingQuote {
  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      amount: 0,
      fee: 0,
      totalToTransfer: 0,
      amountCredited: 0,
    };
  }

  // Calculate in kobo to avoid common floating-point
  // rounding errors when dealing with naira amounts.
  const amountKobo = Math.round(amount * 100);

  const feeKobo = Math.min(
    Math.round(amountKobo * FUNDING_FEE_RATE),
    MAXIMUM_FEE * 100,
  ) + PLATFORM_FEE_FLAT * 100;

  const totalKobo = amountKobo + feeKobo ;

  return {
    amount: amountKobo / 100,
    fee: feeKobo / 100,
    totalToTransfer: totalKobo / 100,
    amountCredited: amountKobo / 100,
  };
}

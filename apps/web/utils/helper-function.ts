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

export const formatGymDuration = (duration: string, value: number) => {
  switch (duration) {
    case "DAILY":
      return `${value} day${value !== 1 ? "s" : ""}`;

    case "WEEKLY":
      return `${value} week${value !== 1 ? "s" : ""}`;

    case "MONTHLY":
      return `${value} month${value !== 1 ? "s" : ""}`;

    case "QUARTERLY":
      return `${value * 3} month${value * 3 !== 1 ? "s" : ""}`;

    case "YEARLY":
      return `${value} year${value !== 1 ? "s" : ""}`;

    default:
      return `${value} ${duration.toLowerCase()}`;
  }
};

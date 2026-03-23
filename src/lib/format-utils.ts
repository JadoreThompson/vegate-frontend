export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatPnL = (pnl: number): string => {
  const formatted = `$${Math.abs(pnl).toFixed(2)}`;
  return pnl >= 0 ? `+${formatted}` : `-${formatted}`;
};

export const formatPercentage = (
  value: number,
  decimals: number = 1,
): string => {
  const formatted = `${Math.abs(value * 100).toFixed(decimals)}%`;
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options || defaultOptions);
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

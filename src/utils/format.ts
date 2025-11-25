export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculatePercentage = (spent: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((spent / total) * 100);
};

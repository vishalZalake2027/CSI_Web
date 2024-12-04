export const USD_TO_INR_RATE = 83.12; // Example fixed rate, you might want to use an API for real-time rates

export const formatToINR = (priceInUSD: number): string => {
  const priceInINR = priceInUSD * USD_TO_INR_RATE;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(priceInINR);
};
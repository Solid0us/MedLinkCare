export const convertCentsToUSD = (val: any) => {
  const convertedNumber = (Number(val) / 100).toFixed(2);
  return `$${convertedNumber}`;
};

export const calculateDaysRemaining = (from: Date, to: Date) => {
  const milliseconds = to.getTime() - from.getTime();
  const days = Math.ceil(milliseconds / 1000 / 60 / 60 / 24);
  return days;
};

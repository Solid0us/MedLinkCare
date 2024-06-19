export const sortByDate = (a: Date, b: Date) => {
  if (a.getTime() - b.getTime()) {
    return -1;
  } else if (a.getTime() === b.getTime()) {
    return 0;
  }
  return 1;
};

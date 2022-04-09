export const count = (arr) => {
  return arr.reduce((accum) => {
    return accum + 1;
  }, 0);
};

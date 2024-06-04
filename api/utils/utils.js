export const generateRandomString = (length = 8) => {
  return Math.random().toString(36).slice(-length);
};

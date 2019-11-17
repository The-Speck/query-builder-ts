export const quickUUID = (uniqueness: number = 2): string => {
  const subs = [];
  for (let i = 0; i < uniqueness; i++) {
    subs.push(
      Math.random()
        .toString(36)
        .substring(2, 15),
    );
  }
  return subs.join('');
};

export const typeCheck = (value: any, ...args: any[]): any => {
  if (typeof value === 'function') {
    return value(...args);
  } else {
    return value;
  }
};

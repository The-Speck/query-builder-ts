export const typeCheck = (value: any, ...args: any[]): any => {
  switch (typeof value) {
    case 'function':
      return value(...args);
    case 'object':
      return args ? value[args[0]] : value;
    default:
      return value;
  }
};

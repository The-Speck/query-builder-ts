export const typeCheck = (value: any, ...args: any[]): any => {
  switch (typeof value) {
    case 'function':
      return value(...args);
    case 'object':
      if (Array.isArray(value)) {
        return value;
      } else if (args.length && value.hasOwnProperty(args[0])) {
        return value[args[0]];
      } else {
        return value;
      }
    default:
      return value;
  }
};

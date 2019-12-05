import { typeCheck } from '../../src/utils';

describe('it', () => {
  it('invokes value with args if function', () => {
    const value = jest.fn((...arg: any) => arg);
    const args = ['a', 'b', 'c'];
    const result = typeCheck(value, ...args);
    expect(result[0]).toBe(args[0]);
    expect(result[1]).toBe(args[1]);
    expect(result[2]).toBe(args[2]);
  });

  it('returns keyed value if object using next argument as key', () => {
    const value = { key: 'value' };
    const key = 'key';
    const result = typeCheck(value, key);
    expect(result).toBe(value[key]);
  });

  it('returns value if string', () => {
    const value = 'value';
    const result = typeCheck(value);
    expect(result).toBe(value);
  });
});

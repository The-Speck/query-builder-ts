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
  it('returns value if not a function', () => {
    const value = 'value';
    const result = typeCheck(value);
    expect(result).toBe(value);
  });
});

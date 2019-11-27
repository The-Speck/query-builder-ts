import { isNumber } from 'util';

describe('it', () => {
  it('returns true if value is number', () => {
    expect(isNumber(5)).toBeTruthy();
  });

  it('returns false if value is number', () => {
    expect(isNumber('banana')).toBeFalsy();
  });
});

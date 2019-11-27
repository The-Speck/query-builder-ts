import { isValidQuery } from '../../src/utils';

describe('it', () => {
  it('returns true if query is valid', () => {
    const query: any = { id: '1', combinator: 'and', conditions: [] };
    expect(isValidQuery(query)).toBeTruthy();
  });
  it('returns false if query is invalid', () => {
    const query: any = {
      id: '1',
      firstName: 'Johnny',
      lastName: 'appleseed',
    };
    expect(isValidQuery(query)).toBeFalsy();
  });
  it('returns false if query is falsey', () => {
    expect(isValidQuery(undefined)).toBeFalsy();
  });
});

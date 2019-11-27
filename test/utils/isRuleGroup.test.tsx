import { TCondition } from '../../src/models';
import { isRuleGroup } from '../../src/utils';

describe('it', () => {
  it('return true if condition is rule group', () => {
    const query: TCondition = { id: '1', combinator: 'and', conditions: [] };
    expect(isRuleGroup(query)).toBeTruthy();
  });
  it('return false if condition is not rule group', () => {
    const query: TCondition = {
      id: '1',
      firstName: 'Johnny',
      lastName: 'appleseed',
    };
    expect(isRuleGroup(query)).toBeFalsy();
  });
});

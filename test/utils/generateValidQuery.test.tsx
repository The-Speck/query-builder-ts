import { IRuleGroup, TCondition } from '../../src/models';
import { generateValidQuery } from '../../src/utils';

describe('it', () => {
  let query: any;

  beforeEach(() => {
    query = {
      combinator: 'and',
      other: 'selector',
      conditions: [
        {
          combinator: 'or',
          other: 'selector',
          conditions: [
            {
              column: 'column',
              op: 'op',
              value: 'value',
            },
          ],
        },
        {
          combinator: 'or',
          other: 'selector',
          conditions: [],
        },
      ],
    };
  });

  it('generates valid query', () => {
    const validQuery = generateValidQuery(query);
    const checkIds = (condition: TCondition): boolean => {
      return condition.id && condition.conditions
        ? condition.conditions.every((c: IRuleGroup) => c.id && checkIds(c))
        : true;
    };
    expect(checkIds(validQuery)).toBeTruthy();
  });
});

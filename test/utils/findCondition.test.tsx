import { IRuleGroup } from '../../src/models';
import * as find from '../../src/utils/findCondition';

describe('it', () => {
  let query: IRuleGroup;

  beforeEach(() => {
    query = {
      id: '0',
      combinator: 'and',
      conditions: [
        {
          id: '1',
          combinator: 'or',
          conditions: [
            {
              id: '2',
              column: 'column',
              op: 'op',
              value: 'value',
            },
          ],
        },
        {
          id: '3',
          combinator: 'or',
          conditions: [],
        },
      ],
    };
  });

  describe('finds condition if', () => {
    it('index and condition exist', () => {
      const spy = jest.spyOn(find, 'findConditionIdxAndParentGroup');
      spy.mockReturnValue([
        1,
        {
          id: '1',
          combinator: 'and',
          conditions: ['condition1', 'condition2'],
        },
      ]);
      const result = find.findCondition('1', query);
      expect(result).toBe('condition2');
    });
  });
});

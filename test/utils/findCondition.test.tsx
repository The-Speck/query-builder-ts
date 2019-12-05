import { RuleGroupCondition } from '../../src/models';
import * as find from '../../src/utils/findCondition';

describe('it', () => {
  let query: RuleGroupCondition;

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
      const result = find.findCondition('condition2', query);
      expect(result).toBe('condition2');
      spy.mockRestore();
    });

    it('condition exist', () => {
      const spy = jest.spyOn(find, 'findConditionIdxAndParentGroup');
      spy.mockReturnValue([
        null,
        {
          id: '1',
          combinator: 'and',
          conditions: ['condition1', 'condition2'],
        },
      ]);
      const result = find.findCondition('1', query);
      expect((result as RuleGroupCondition).id).toBe('1');
      spy.mockRestore();
    });

    it('none exist', () => {
      const spy = jest.spyOn(find, 'findConditionIdxAndParentGroup');
      spy.mockReturnValue([null, null]);
      const result = find.findCondition('1', query);
      expect(result).toBeNull();
      spy.mockRestore();
    });
  });

  describe('finds', () => {
    it('condition index and parent group', () => {
      const [idx, parentGroup] = find.findConditionIdxAndParentGroup(
        '2',
        query,
      );
      if (idx !== null && parentGroup) {
        const condition = parentGroup.conditions[idx];
        expect(condition.id).toBe('2');
      } else {
        throw new Error('error running findConditionIdxAndParentGroup test');
      }
    });
    it('parent group', () => {
      const [idx, parentGroup] = find.findConditionIdxAndParentGroup(
        '0',
        query,
      );
      expect(idx).toBeNull();
      if (parentGroup) {
        expect(parentGroup.id).toBe('0');
      } else {
        throw new Error('error running findConditionIdxAndParentGroup test');
      }
    });
    it('nothing', () => {
      const [idx, parentGroup] = find.findConditionIdxAndParentGroup(
        '-1',
        query,
      );
      expect(idx).toBeNull();
      expect(parentGroup).toBeNull();
    });
  });
});

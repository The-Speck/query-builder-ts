import { Condition, RuleGroupCondition } from '../models';
import { isNumber } from './isNumber';
import { isRuleGroup } from './isRuleGroup';

export const findCondition = (
  id: string,
  query: RuleGroupCondition,
): Condition | null => {
  const [idx, condition] = findConditionIdxAndParentGroup(id, query);

  if (isNumber(idx) && condition) {
    return condition.conditions[idx];
  } else if (condition) {
    return condition;
  } else {
    return null;
  }
};

export type FindConditionAndParent = [number | null, Condition | null];

export const findConditionIdxAndParentGroup = (
  id: string,
  query: RuleGroupCondition,
): FindConditionAndParent => {
  if (query.id === id) {
    return [null, query];
  }

  for (let idx = 0; idx < query.conditions.length; idx++) {
    const condition = query.conditions[idx];

    if (condition.id === id) {
      return [idx, query];
    } else if (isRuleGroup(condition)) {
      const [conditionIdx, group] = findConditionIdxAndParentGroup(
        id,
        condition as RuleGroupCondition,
      );
      if (isNumber(conditionIdx) && group) {
        return [conditionIdx, group];
      }
    }
  }

  return [null, null];
};

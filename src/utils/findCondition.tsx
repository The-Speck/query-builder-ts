import { isNumber, isRuleGroup } from '.';
import { IRuleGroup, TCondition } from '../models';

export const findCondition = (
  id: string,
  query: IRuleGroup,
): TCondition | null => {
  const [idx, condition] = findConditionIdxAndParentGroup(id, query);

  if (isNumber(idx) && condition) {
    return condition.conditions[idx];
  } else if (condition) {
    return condition;
  } else {
    return null;
  }
};

export type TFindConditionAndParent = [number | null, TCondition | null];

export const findConditionIdxAndParentGroup = (
  id: string,
  query: IRuleGroup,
): TFindConditionAndParent => {
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
        condition as IRuleGroup,
      );
      if (isNumber(conditionIdx) && group) {
        return [conditionIdx, group];
      }
    }
  }

  return [null, null];
};

import { isRuleGroup } from '.';
import { IRuleGroup, TCondition } from '../models';

export const findCondition = (
  id: string,
  query: IRuleGroup,
): TCondition | null => {
  if (query.id === id) {
    return query;
  }

  for (const condition of query.conditions) {
    if (condition.id === id) {
      return condition;
    } else if (isRuleGroup(condition)) {
      return findCondition(id, condition as IRuleGroup);
    }
  }

  return null;
};

export type TFindConditionAndParent = [number, TCondition];

export const findConditionIdxAndParent = (
  id: string,
  query: IRuleGroup,
): TFindConditionAndParent | null => {
  for (let idx = 0; idx < query.conditions.length; idx++) {
    const condition = query.conditions[idx];
    if (condition.id === id) {
      return [idx, query];
    } else if (isRuleGroup(condition)) {
      return findConditionIdxAndParent(id, condition as IRuleGroup);
    }
  }
  return null;
};

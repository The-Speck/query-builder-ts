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

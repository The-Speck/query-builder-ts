import { isRuleGroup } from '.';
import { RuleGroupCondition } from '../models';

export const isValidQuery = (
  query?: RuleGroupCondition,
): query is RuleGroupCondition => {
  if (query) {
    return isRuleGroup(query);
  }
  return false;
};

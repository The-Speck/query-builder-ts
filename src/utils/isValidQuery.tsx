import { RuleGroupCondition } from '../models';
import { isRuleGroup } from './isRuleGroup';

export const isValidQuery = (
  query?: RuleGroupCondition,
): query is RuleGroupCondition => {
  if (query) {
    return isRuleGroup(query);
  }
  return false;
};

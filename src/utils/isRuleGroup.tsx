import isNil from 'lodash/isNil';
import { Condition, RuleGroupCondition } from '../models';

export const isRuleGroup = (query: Condition): query is RuleGroupCondition => {
  return !(isNil(query.combinator) && isNil(query.conditions));
};

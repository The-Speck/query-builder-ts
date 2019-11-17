import isNil from 'lodash/isNil';
import { IRuleGroup, TCondition } from '../models';

export const isRuleGroup = (query: TCondition): query is IRuleGroup => {
  return !(isNil(query.combinator) && isNil(query.conditions));
};

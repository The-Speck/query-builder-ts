import isNil from 'lodash/isNil';
import { Condition } from '../models';

export const isRuleGroup = (query: Condition): boolean => {
  return !(isNil(query.combinator) && isNil(query.conditions));
};

export default isRuleGroup;

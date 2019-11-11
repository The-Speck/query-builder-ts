import { IRuleGroup } from '../models';
import isRuleGroup from './isRuleGroup';

export const isValidQuery = (query: IRuleGroup): boolean => {
  return query && isRuleGroup(query);
};

export default isValidQuery;

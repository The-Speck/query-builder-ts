import { isRuleGroup } from '.';
import { IRuleGroup } from '../models';

export const isValidQuery = (query: IRuleGroup): query is IRuleGroup => {
  return query && isRuleGroup(query);
};

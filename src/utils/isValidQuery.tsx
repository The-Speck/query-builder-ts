import { isRuleGroup } from '.';
import { IRuleGroup } from '../models';

export const isValidQuery = (query?: IRuleGroup): query is IRuleGroup => {
  if (query) {
    return isRuleGroup(query);
  }
  return false;
};

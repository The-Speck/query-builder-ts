import { Condition } from '../models';
import { isRuleGroup } from './isRuleGroup';
import { quickUUID } from './quickUUID';

export const generateValidQuery = (query: Condition): Condition => {
  if (isRuleGroup(query)) {
    return {
      ...query,
      id: query.id || `g-${quickUUID()}`,
      conditions: query.conditions.map((condition: Condition) =>
        generateValidQuery(condition),
      ),
    };
  }
  return {
    ...query,
    id: query.id || `r-${quickUUID()}`,
  };
};

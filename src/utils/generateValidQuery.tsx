import { isRuleGroup, quickUUID } from '.';
import { Condition } from '../models';

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

import { isRuleGroup, quickUUID } from '.';
import { TCondition } from '../models';

export const generateValidQuery = (query: TCondition): TCondition => {
  if (isRuleGroup(query)) {
    return {
      ...query,
      id: query.id || `g-${quickUUID()}`,
      conditions: query.conditions.map((condition: TCondition) =>
        generateValidQuery(condition),
      ),
    };
  }
  return {
    ...query,
    id: query.id || `r-${quickUUID()}`,
  };
};

import { isRuleGroup, quickUUID } from '.';
import { TCondition } from '../models';

export const generateValidQuery = (query: TCondition): TCondition => {
  if (isRuleGroup(query)) {
    return {
      id: query.id || `g-${quickUUID()}`,
      conditions: query.conditions.map((condition: TCondition) =>
        generateValidQuery(condition),
      ),
      combinator: query.combinator,
    };
  }
  return {
    id: query.id || `r-${quickUUID()}`,
    ...query,
  };
};

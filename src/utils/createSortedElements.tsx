import sortBy from 'lodash/sortBy';
import { ControlElement, RuleElements, RuleGroupElements } from '../models';

export const createSortedElements = (
  conditions: RuleElements | RuleGroupElements,
): ControlElement[] => {
  const conditionValues = Object.values(conditions);
  return sortBy(conditionValues, ['position']);
};

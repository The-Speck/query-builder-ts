import chain from 'lodash/chain';
import { ControlElement, RuleElements, RuleGroupElements } from '../models';

export const createSortedElements = (
  conditions: RuleElements | RuleGroupElements,
): ControlElement[] => {
  return chain(conditions)
    .values()
    .sortBy('position')
    .value();
};

export default createSortedElements;

import sortBy from 'lodash/sortBy';
import { ControlElement } from '../models';

export const sortElements = (
  conditions: ControlElement[],
): ControlElement[] => {
  return sortBy(conditions, ['position']);
};

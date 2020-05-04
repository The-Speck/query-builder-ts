import isNil from 'lodash/isNil';
import { ControlActions } from '../models';

export const isValidName = (name: string): boolean => {
  return !isNil(name) && !Object.values<string>(ControlActions).includes(name);
};

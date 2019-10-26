import ValueDropDown from '../../controls/ValueDropDown';
import { ControlElement } from '../../models';
import defaultOperators from '../elementOptions/operators';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultOperatorSelector: ControlElement = {
  component: ValueDropDown,
  name: 'op',
  options: defaultOperators,
  className: ruleElementsClassNames.operators,
  position: 2,
  defaultValue: '=',
};

export default defaultOperatorSelector;

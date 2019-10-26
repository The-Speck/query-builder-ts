import ValueDropDown from '../../controls/ValueDropDown';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';
import defaultOperators from '../elementOptions/operators';

export const defaultOperatorSelector: ControlElement = {
  component: ValueDropDown,
  name: 'op',
  options: defaultOperators,
  className: defaultControlClassNames.operators,
  position: 2,
  defaultValue: '=',
};

export default defaultOperatorSelector;

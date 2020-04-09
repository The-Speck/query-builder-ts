import { ValueDropDown } from '../../controls';
import { ControlElement, ControlElementProps } from '../../models';
import defaultOperators from '../elementOptions/operators';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultOperatorSelector extends ControlElement {
  props: ControlElementProps;
}

export const defaultOperatorSelector: DefaultOperatorSelector = {
  component: ValueDropDown,
  name: 'op',
  position: 2,
  props: {
    defaultValue: '=',
    options: defaultOperators,
    className: ruleElementsClassNames.operators,
  },
};

export default defaultOperatorSelector;

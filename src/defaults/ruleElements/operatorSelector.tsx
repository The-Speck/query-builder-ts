import { ValueDropDown } from '../../controls';
import { ControlElementProps, RuleElement } from '../../models';
import defaultOperators from '../elementOptions/operators';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultOperatorSelector extends RuleElement {
  props: ControlElementProps;
}

export const defaultOperatorSelector: DefaultOperatorSelector = {
  component: ValueDropDown,
  name: 'op',
  props: {
    defaultValue: '=',
    options: defaultOperators,
    className: ruleElementsClassNames.operators,
  },
};

export default defaultOperatorSelector;

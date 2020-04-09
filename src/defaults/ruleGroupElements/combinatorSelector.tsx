import { ValueDropDown } from '../../controls';
import { ControlElement, ControlElementProps } from '../../models';
import defaultCombinators from '../elementOptions/combinators';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultCombinatorSelector extends ControlElement {
  props: ControlElementProps;
}

export const defaultCombinatorSelector: DefaultCombinatorSelector = {
  component: ValueDropDown,
  name: 'combinator',
  position: 1,
  props: {
    options: defaultCombinators,
    defaultValue: defaultCombinators[0].name,
    className: ruleGroupElementsClassNames.combinators,
  },
};

export default defaultCombinatorSelector;

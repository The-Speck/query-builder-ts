import { ValueDropDown } from '../../controls';
import { ControlElementProps, RuleGroupElement } from '../../models';
import defaultCombinators from '../elementOptions/combinators';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultCombinatorSelector extends RuleGroupElement {
  props: ControlElementProps;
}

export const defaultCombinatorSelector: DefaultCombinatorSelector = {
  component: ValueDropDown,
  name: 'combinator',
  props: {
    options: defaultCombinators,
    defaultValue: defaultCombinators[0].name,
    className: ruleGroupElementsClassNames.combinators,
  },
};

export default defaultCombinatorSelector;

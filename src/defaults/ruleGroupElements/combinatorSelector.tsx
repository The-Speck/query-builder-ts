import { ValueDropDown } from '../../controls';
import { ControlElement } from '../../models';
import defaultCombinators from '../elementOptions/combinators';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface CombinatorSelectorElement extends ControlElement {
  defaultValue: string;
}

export const defaultCombinatorSelector: CombinatorSelectorElement = {
  component: ValueDropDown,
  name: 'combinator',
  options: defaultCombinators,
  className: ruleGroupElementsClassNames.combinators,
  position: 1,
  defaultValue: defaultCombinators[0].name,
};

export default defaultCombinatorSelector;

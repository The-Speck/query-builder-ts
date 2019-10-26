import ValueDropDown from '../../controls/ValueDropDown';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';
import defaultCombinators from '../elementOptions/combinators';

export interface IDefaultCombinatorSelector extends ControlElement {
  defaultValue: string;
}

export const defaultCombinatorSelector: IDefaultCombinatorSelector = {
  component: ValueDropDown,
  name: 'combinator',
  options: defaultCombinators,
  className: defaultControlClassNames.combinators,
  position: 1,
  defaultValue: defaultCombinators[0].name,
};

export default defaultCombinatorSelector;

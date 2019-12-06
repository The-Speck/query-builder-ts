import { RuleProps } from '../Rule';
import { RuleGroupProps } from '../RuleGroup';
import { ControlElement } from './ControlElementInterface';
import { HandleOnChange } from './miscellaneous';

export interface ControlProps extends ControlElement {
  handleOnChange: HandleOnChange;
  parentProps: RuleGroupProps | RuleProps;
  value: any;
  [key: string]: any;
}

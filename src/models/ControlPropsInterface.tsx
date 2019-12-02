import { ControlElement, HandleOnChange } from '.';
import { RuleProps } from '../Rule';
import { RuleGroupProps } from '../RuleGroup';

export interface ControlProps extends ControlElement {
  handleOnChange: HandleOnChange;
  parentProps: RuleGroupProps | RuleProps;
  value: any;
  [key: string]: any;
}

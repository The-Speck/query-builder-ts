import { ControlElement, handleOnChange } from '.';
import { IRuleProps } from '../Rule';
import { IRuleGroupProps } from '../RuleGroup';

export interface IControlProps extends ControlElement {
  handleOnChange: handleOnChange;
  parentProps: IRuleGroupProps | IRuleProps;
  value: any;
  [key: string]: any;
}

import { ControlElement, THandleOnChange } from '.';
import { IRuleProps } from '../Rule';
import { IRuleGroupProps } from '../RuleGroup';

export interface IControlProps extends ControlElement {
  handleOnChange: THandleOnChange;
  parentProps: IRuleGroupProps | IRuleProps;
  value: any;
  [key: string]: any;
}

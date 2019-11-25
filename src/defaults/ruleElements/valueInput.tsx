import { ValueInput } from '../../controls';
import { ControlElement, IControlProps } from '../../models';
import { IRuleProps } from '../../Rule';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface InputControlElement extends ControlElement {
  debounceTime?: number;
}

export const defaultValueInput: InputControlElement = {
  component: ValueInput,
  name: 'value',
  className: ruleElementsClassNames.value,
  label: 'Value',
  position: 3,
  defaultValue: '',
  condition: ({ parentProps }: IControlProps): boolean =>
    (parentProps as IRuleProps).rule.op !== 'null' &&
    (parentProps as IRuleProps).rule.op !== 'notNull',
};

export default defaultValueInput;

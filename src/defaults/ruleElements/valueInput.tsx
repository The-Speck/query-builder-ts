import { ValueInput } from '../../controls';
import { ControlElement, ControlProps } from '../../models';
import { RuleProps } from '../../Rule';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultValueInput: ControlElement = {
  component: ValueInput,
  name: 'value',
  className: ruleElementsClassNames.value,
  label: 'Value',
  position: 3,
  defaultValue: '',
  condition: ({ parentProps }: ControlProps): boolean =>
    (parentProps as RuleProps).rule.op !== 'null' &&
    (parentProps as RuleProps).rule.op !== 'notNull',
};

export default defaultValueInput;

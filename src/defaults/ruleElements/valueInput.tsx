import { ValueInput, ValueInputControlProps } from '../../controls';
import { ControlElement, ControlProps } from '../../models';
import { RuleProps } from '../../Rule';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultValueInput extends ControlElement {
  props: ValueInputControlProps;
}

export const defaultValueInput: DefaultValueInput = {
  component: ValueInput,
  name: 'value',
  position: 3,
  props: {
    label: 'Value',
    condition: ({ parentProps }: ControlProps): boolean =>
      (parentProps as RuleProps).rule.op !== 'null' &&
      (parentProps as RuleProps).rule.op !== 'notNull',
    defaultValue: '',
    className: ruleElementsClassNames.value,
  },
};

export default defaultValueInput;

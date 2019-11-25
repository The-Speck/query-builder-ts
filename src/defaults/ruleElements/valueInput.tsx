import ValueInput from '../../controls/ValueInput';
import { ControlElement } from '../../models';
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
  condition: ({ parentProps }) =>
    parentProps.rule.op !== 'null' && parentProps.rule.op !== 'notNull',
};

export default defaultValueInput;

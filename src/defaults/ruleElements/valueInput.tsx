import ValueInput from '../../controls/ValueInput';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultValueInput: ControlElement = {
  component: ValueInput,
  name: 'value',
  className: ruleElementsClassNames.value,
  label: 'Value',
  position: 3,
  defaultValue: '',
  condition: ({ rule }) => rule.op !== 'null' && rule.op !== 'notNull',
};

export default defaultValueInput;

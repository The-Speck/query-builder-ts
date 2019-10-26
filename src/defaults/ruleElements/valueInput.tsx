import ValueInput from '../../controls/ValueInput';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultValueInput: ControlElement = {
  component: ValueInput,
  name: 'value',
  className: defaultControlClassNames.value,
  label: 'Value',
  position: 3,
  defaultValue: '',
  condition: ({ rule }) => rule.op !== 'null' && rule.op !== 'notNull',
};

export default defaultValueInput;

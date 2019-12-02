import { ValueComboBox } from '../../controls';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface ComboBoxControlElement extends ControlElement {
  debounceTime?: number;
  inputType?: string;
}

export const defaultColumnSelector: ComboBoxControlElement = {
  component: ValueComboBox,
  name: 'column',
  className: ruleElementsClassNames.columns,
  position: 1,
  defaultValue: '',
};

export default defaultColumnSelector;

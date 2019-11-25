import ValueComboBox from '../../controls/ValueComboBox';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface ComboBoxControlElement extends ControlElement {
  debounceTime?: number;
  inputType?: string;
}

export const defaultColumnSelector: ComboBoxControlElement = {
  component: ValueComboBox,
  name: 'column',
  options: [],
  className: ruleElementsClassNames.columns,
  position: 1,
  defaultValue: '',
};

export default defaultColumnSelector;

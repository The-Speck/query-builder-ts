import ValueComboBox from '../../controls/ValueComboBox';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultColumnSelector: ControlElement = {
  component: ValueComboBox,
  name: 'column',
  options: [],
  className: ruleElementsClassNames.columns,
  position: 1,
  defaultValue: '',
};

export default defaultColumnSelector;

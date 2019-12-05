import { ValueComboBox } from '../../controls';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultColumnSelector: ControlElement = {
  component: ValueComboBox,
  name: 'column',
  className: ruleElementsClassNames.columns,
  position: 1,
  defaultValue: '',
};

export default defaultColumnSelector;

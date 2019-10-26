import ValueComboBox from '../../controls/ValueComboBox';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultColumnSelector: ControlElement = {
  component: ValueComboBox,
  name: 'column',
  options: [],
  className: defaultControlClassNames.columns,
  position: 1,
  defaultValue: '',
};

export default defaultColumnSelector;

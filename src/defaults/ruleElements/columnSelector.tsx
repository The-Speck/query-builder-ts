import { ControlElement } from '../..';
import { ValueComboBox, ValueInputControlProps } from '../../controls';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultColumnSelector extends ControlElement {
  props: ValueInputControlProps;
}

export const defaultColumnSelector: DefaultColumnSelector = {
  component: ValueComboBox,
  name: 'column',
  position: 1,
  props: {
    options: [],
    defaultValue: '',
    className: ruleElementsClassNames.columns,
  },
};

export default defaultColumnSelector;

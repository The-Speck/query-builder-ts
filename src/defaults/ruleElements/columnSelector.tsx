import { RuleElement } from '../..';
import { ValueComboBox, ValueInputControlProps } from '../../controls';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultColumnSelector extends RuleElement {
  props: ValueInputControlProps;
}

export const defaultColumnSelector: DefaultColumnSelector = {
  component: ValueComboBox,
  name: 'column',
  isColumn: true,
  props: {
    options: [],
    defaultValue: '',
    className: ruleElementsClassNames.columns,
  },
};

export default defaultColumnSelector;

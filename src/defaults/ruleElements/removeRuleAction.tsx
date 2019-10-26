import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export const defaultRemoveRuleAction: ControlElement = {
  component: ActionButton,
  name: 'removeRule',
  label: 'x',
  className: ruleElementsClassNames.removeRule,
  position: 99,
};

export default defaultRemoveRuleAction;

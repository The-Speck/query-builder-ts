import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultRemoveRuleAction: ControlElement = {
  component: ActionButton,
  name: 'removeRule',
  label: 'x',
  className: defaultControlClassNames.removeRule,
  position: 99,
};

export default defaultRemoveRuleAction;

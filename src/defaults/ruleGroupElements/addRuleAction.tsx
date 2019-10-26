import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultAddRuleAction: ControlElement = {
  component: ActionButton,
  name: 'addRule',
  label: '+Rule',
  className: defaultControlClassNames.addRule,
  position: 97,
};

export default defaultAddRuleAction;

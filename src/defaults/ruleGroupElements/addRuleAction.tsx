import { ActionButton } from '../../controls';
import { ControlElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export const defaultAddRuleAction: ControlElement = {
  component: ActionButton,
  name: 'addRule',
  label: '+Rule',
  className: ruleGroupElementsClassNames.addRule,
  position: 97,
};

export default defaultAddRuleAction;

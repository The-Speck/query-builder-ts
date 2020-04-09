import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, ControlElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultAddRuleAction extends ControlElement {
  props: ActionButtonControlProps;
}

export const defaultAddRuleAction: DefaultAddRuleAction = {
  component: ActionButton,
  name: ActionTypes.ADD_RULE,
  position: 97,
  props: {
    label: '+Rule',
    className: ruleGroupElementsClassNames.addRule,
  },
};

export default defaultAddRuleAction;

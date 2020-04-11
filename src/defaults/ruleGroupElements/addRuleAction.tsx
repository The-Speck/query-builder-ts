import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, RuleGroupElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultAddRuleAction extends RuleGroupElement {
  props: ActionButtonControlProps;
}

export const defaultAddRuleAction: DefaultAddRuleAction = {
  component: ActionButton,
  name: ActionTypes.ADD_RULE,
  props: {
    label: '+Rule',
    className: ruleGroupElementsClassNames.addRule,
  },
};

export default defaultAddRuleAction;

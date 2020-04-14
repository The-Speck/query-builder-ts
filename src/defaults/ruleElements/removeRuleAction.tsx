import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ControlActions, RuleElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultRemoveRuleAction extends RuleElement {
  props: ActionButtonControlProps;
}

export const defaultRemoveRuleAction: DefaultRemoveRuleAction = {
  component: ActionButton,
  name: ControlActions.REMOVE_RULE,
  props: {
    label: 'x',
    className: ruleElementsClassNames.removeRule,
  },
};

export default defaultRemoveRuleAction;

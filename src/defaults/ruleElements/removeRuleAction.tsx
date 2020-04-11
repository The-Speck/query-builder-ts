import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, RuleElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultRemoveRuleAction extends RuleElement {
  props: ActionButtonControlProps;
}

export const defaultRemoveRuleAction: DefaultRemoveRuleAction = {
  component: ActionButton,
  name: ActionTypes.REMOVE_RULE,
  props: {
    label: 'x',
    className: ruleElementsClassNames.removeRule,
  },
};

export default defaultRemoveRuleAction;

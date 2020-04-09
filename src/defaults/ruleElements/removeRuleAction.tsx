import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, ControlElement } from '../../models';
import ruleElementsClassNames from './ruleElementsClassNames';

export interface DefaultRemoveRuleAction extends ControlElement {
  props: ActionButtonControlProps;
}

export const defaultRemoveRuleAction: DefaultRemoveRuleAction = {
  component: ActionButton,
  name: ActionTypes.REMOVE_RULE,
  position: 99,
  props: {
    label: 'x',
    className: ruleElementsClassNames.removeRule,
  },
};

export default defaultRemoveRuleAction;

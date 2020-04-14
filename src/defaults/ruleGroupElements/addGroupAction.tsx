import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ControlActions, RuleGroupElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultAddGroupAction extends RuleGroupElement {
  props: ActionButtonControlProps;
}

export const defaultAddGroupAction: DefaultAddGroupAction = {
  component: ActionButton,
  name: ControlActions.ADD_GROUP,
  props: {
    label: '+Group',
    className: ruleGroupElementsClassNames.addGroup,
  },
};

export default defaultAddGroupAction;

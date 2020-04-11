import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, RuleGroupElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultAddGroupAction extends RuleGroupElement {
  props: ActionButtonControlProps;
}

export const defaultAddGroupAction: DefaultAddGroupAction = {
  component: ActionButton,
  name: ActionTypes.ADD_GROUP,
  props: {
    label: '+Group',
    className: ruleGroupElementsClassNames.addGroup,
  },
};

export default defaultAddGroupAction;

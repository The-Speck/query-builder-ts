import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, ControlElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultAddGroupAction extends ControlElement {
  props: ActionButtonControlProps;
}

export const defaultAddGroupAction: DefaultAddGroupAction = {
  component: ActionButton,
  name: ActionTypes.ADD_GROUP,
  position: 98,
  props: {
    label: '+Group',
    className: ruleGroupElementsClassNames.addGroup,
  },
};

export default defaultAddGroupAction;

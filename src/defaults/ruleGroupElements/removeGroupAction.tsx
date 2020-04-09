import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ActionTypes, ControlElement, ControlProps } from '../../models';
import { RuleGroupProps } from '../../RuleGroup';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultRemoveGroupAction extends ControlElement {
  props: ActionButtonControlProps;
}

export const defaultRemoveGroupAction: DefaultRemoveGroupAction = {
  component: ActionButton,
  name: ActionTypes.REMOVE_GROUP,
  position: 99,
  props: {
    label: 'X',
    condition: ({ parentProps }: ControlProps): boolean =>
      (parentProps as RuleGroupProps).level > 0,
    className: ruleGroupElementsClassNames.removeGroup,
  },
};

export default defaultRemoveGroupAction;

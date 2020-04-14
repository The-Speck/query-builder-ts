import { ActionButton, ActionButtonControlProps } from '../../controls';
import { ControlActions, ControlProps, RuleGroupElement } from '../../models';
import { RuleGroupProps } from '../../RuleGroup';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export interface DefaultRemoveGroupAction extends RuleGroupElement {
  props: ActionButtonControlProps;
}

export const defaultRemoveGroupAction: DefaultRemoveGroupAction = {
  component: ActionButton,
  name: ControlActions.REMOVE_GROUP,
  props: {
    label: 'X',
    condition: ({ parentProps }: ControlProps): boolean =>
      (parentProps as RuleGroupProps).level > 0,
    className: ruleGroupElementsClassNames.removeGroup,
  },
};

export default defaultRemoveGroupAction;

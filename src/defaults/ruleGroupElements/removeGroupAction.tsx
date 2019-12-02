import { ActionButton } from '../../controls';
import { ControlElement, ControlProps } from '../../models';
import { RuleGroupProps } from '../../RuleGroup';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export const defaultRemoveGroupAction: ControlElement = {
  component: ActionButton,
  name: 'removeGroup',
  label: 'X',
  className: ruleGroupElementsClassNames.removeGroup,
  position: 99,
  condition: ({ parentProps }: ControlProps): boolean =>
    (parentProps as RuleGroupProps).level > 0,
};

export default defaultRemoveGroupAction;

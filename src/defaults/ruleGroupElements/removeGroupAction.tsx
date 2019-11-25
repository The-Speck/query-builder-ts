import { ActionButton } from '../../controls';
import { ControlElement, IControlProps } from '../../models';
import { IRuleGroupProps } from '../../RuleGroup';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export const defaultRemoveGroupAction: ControlElement = {
  component: ActionButton,
  name: 'removeGroup',
  label: 'X',
  className: ruleGroupElementsClassNames.removeGroup,
  position: 99,
  condition: ({ parentProps }: IControlProps): boolean =>
    (parentProps as IRuleGroupProps).level > 0,
};

export default defaultRemoveGroupAction;

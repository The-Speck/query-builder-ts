import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export const defaultRemoveGroupAction: ControlElement = {
  component: ActionButton,
  name: 'removeGroup',
  label: 'X',
  className: ruleGroupElementsClassNames.removeGroup,
  position: 99,
  condition: ({ parentProps }) => parentProps.level > 0,
};

export default defaultRemoveGroupAction;

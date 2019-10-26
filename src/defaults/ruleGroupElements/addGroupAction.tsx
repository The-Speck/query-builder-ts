import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import ruleGroupElementsClassNames from './ruleGroupElementsClassNames';

export const defaultAddGroupAction: ControlElement = {
  component: ActionButton,
  name: 'addGroup',
  label: '+Group',
  className: ruleGroupElementsClassNames.addGroup,
  position: 98,
};

export default defaultAddGroupAction;

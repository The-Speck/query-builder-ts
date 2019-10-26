import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultAddGroupAction: ControlElement = {
  component: ActionButton,
  name: 'addGroup',
  label: '+Group',
  className: defaultControlClassNames.addGroup,
  position: 98,
};

export default defaultAddGroupAction;

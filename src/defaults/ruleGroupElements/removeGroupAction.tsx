import ActionButton from '../../controls/ActionButton';
import { ControlElement } from '../../models';
import defaultControlClassNames from '../elementOptions/classNames';

export const defaultRemoveGroupAction: ControlElement = {
  component: ActionButton,
  name: 'removeGroup',
  label: 'X',
  className: defaultControlClassNames.removeGroup,
  position: 99,
  condition: ({ parentId }) => parentId,
};

export default defaultRemoveGroupAction;

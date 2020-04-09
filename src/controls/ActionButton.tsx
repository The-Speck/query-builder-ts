import classnames from 'classnames';
import * as React from 'react';
import { ControlElementProps, SystemControlProps } from '../models';
import { typeCheck } from '../utils';

export interface ActionButtonControlProps extends ControlElementProps {
  label?: string;
}

export type ActionButtonProps = ActionButtonControlProps & SystemControlProps;

export const ActionButton: React.FC<ActionButtonProps> = props => {
  const { onChange, className, label, condition } = props;

  if (condition && !condition(props)) {
    return null;
  }

  return (
    <button
      className={classnames(typeCheck(className, 'button', props))}
      onClick={onChange}>
      {label}
    </button>
  );
};

export default ActionButton;
